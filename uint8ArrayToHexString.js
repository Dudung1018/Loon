async function stringToSha256Uint8Array(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str); // 原始 string 转 Uint8Array

    const hashBuffer = await crypto.subtle.digest("SHA-256", data); // 浏览器/Node 内建
    return new Uint8Array(hashBuffer); // 32 字节
}

// 使用示例
const str = "dee84293c8d15948ee38689ee00b4c793caebebdeedca7b97bc32f7aaed22e04";
stringToSha256Uint8Array(str).then(hash32 => {
    // console.log(hash32); // Uint8Array(32)
});



 // 64个字节
class SHA256 {
    constructor() {
        // SHA-256 初始哈希值（8 个 32 位整数）
        this.w = new Uint32Array([
            0x6a09e667, 0xbb67ae85,
            0x3c6ef372, 0xa54ff53a,
            0x510e527f, 0x9b05688c,
            0x1f83d9ab, 0x5be0cd19,
        ]);
        this.x = new Uint32Array(64);    // 消息扩展数组
        this.buffer = new Uint8Array(64); // 输入缓冲区，64 字节
        this.d = 0;  // 输入长度计数
    }

    // 写入输入数据（仅接受 64 字节）
    write(input) {
        if (input.length !== 64) throw new Error('输入必须是64字节Uint8Array');
        this.buffer.set(input);
        this.d = 64;
    }

    // SHA-256 填充和消息长度编码
    pad() {
        let buf = this.buffer;
        let d = this.d;

        // 先在末尾加0x80
        if (d < 64) buf[d] = 0x80;
        for (let i = d + 1; i < 64 - 8; i++) buf[i] = 0;

        // 64 位消息长度（比特）
        let bitLen = d * 8;

        // 大端写入消息长度到最后8字节
        let view = new DataView(buf.buffer);
        view.setUint32(56, 0, false);          // 高32位 0 (因为消息只64字节，低于 2^32 bits)
        view.setUint32(60, bitLen, false);     // 低32位
    }

    // 消息扩展
    expand() {
        let w = this.x;
        let buf = this.buffer;
        let view = new DataView(buf.buffer);

        // 前16个词从输入缓冲区读取
        for (let i = 0; i < 16; i++) {
            w[i] = view.getUint32(i * 4, false);
        }
        // 扩展后48个词
        for (let i = 16; i < 64; i++) {
            let s0 = (w[i - 15] >>> 7 | w[i - 15] << 25) ^
                (w[i - 15] >>> 18 | w[i - 15] << 14) ^
                (w[i - 15] >>> 3);
            let s1 = (w[i - 2] >>> 17 | w[i - 2] << 15) ^
                (w[i - 2] >>> 19 | w[i - 2] << 13) ^
                (w[i - 2] >>> 10);
            w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
        }
    }

    // SHA-256 主压缩循环
    compress() {
        let w = this.x;
        let k = SHA256.K;
        let h = this.w;

        let a = h[0], b = h[1], c = h[2], d = h[3];
        let e = h[4], f = h[5], g = h[6], h_ = h[7];

        for (let i = 0; i < 64; i++) {
            let S1 = ((e >>> 6) | (e << 26)) ^
                ((e >>> 11) | (e << 21)) ^
                ((e >>> 25) | (e << 7));
            let ch = (e & f) ^ (~e & g);
            let temp1 = (h_ + S1 + ch + k[i] + w[i]) >>> 0;
            let S0 = ((a >>> 2) | (a << 30)) ^
                ((a >>> 13) | (a << 19)) ^
                ((a >>> 22) | (a << 10));
            let maj = (a & b) ^ (a & c) ^ (b & c);
            let temp2 = (S0 + maj) >>> 0;

            h_ = g;
            g = f;
            f = e;
            e = (d + temp1) >>> 0;
            d = c;
            c = b;
            b = a;
            a = (temp1 + temp2) >>> 0;
        }

        this.w[0] = (this.w[0] + a) >>> 0;
        this.w[1] = (this.w[1] + b) >>> 0;
        this.w[2] = (this.w[2] + c) >>> 0;
        this.w[3] = (this.w[3] + d) >>> 0;
        this.w[4] = (this.w[4] + e) >>> 0;
        this.w[5] = (this.w[5] + f) >>> 0;
        this.w[6] = (this.w[6] + g) >>> 0;
        this.w[7] = (this.w[7] + h_) >>> 0;
    }

    // 返回 32 字节哈希
    digest() {
        let out = new Uint8Array(32);
        let view = new DataView(out.buffer);
        for (let i = 0; i < 8; i++) {
            view.setUint32(i * 4, this.w[i], false);
        }
        return out;
    }

    // 全流程调用
    hash(input) {
        this.write(input);
        this.pad();
        this.expand();
        this.compress();
        return this.digest();
    }
}

// SHA-256 常量 K
SHA256.K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);



class SHA256_16 {
    constructor() {
        this.sha256 = new SHA256();
    }

    hash16(input) {
        const fullHash = this.sha256.hash(input); // 32 字节 Uint8Array
        return fullHash; // 截取前16字节
    }
}

// // 输出 16 字节
// const input = new Uint8Array(64)
// // 你可以手动填充数据
// input.set([
//     100, 101, 101,  56,  52,  50,  57, 51, 99,  56, 100,  49,
//     53,  57,  52,  56, 101, 101,  51, 56, 54,  56,  57, 101,
//     101,  48,  48,  98,  52,  99,  55, 57, 51,  99,  97, 101,
//     98, 101,  98, 100, 101, 101, 100, 99, 97,  55,  98,  57,
//     55,  98,  99,  51,  50, 102,  55, 97, 97, 101, 100,  50,
//     50, 101,  48,  52
// ])

//
// const sha16 = new SHA256_16();
// const hash16 = sha16.hash16(input);
// console.log(hash16); // Uint8Array(16)


import {createHash} from 'crypto'
function customHash(input64) {
    const hash = createHash('md5')
    for (const num of input64) {
        // 将每个 32bit uint 转成 4 字节写入 buffer
        const buf = Buffer.allocUnsafe(4)
        buf.writeUInt32BE(num)
        hash.update(buf)
    }
    return Uint8Array.from(hash.digest().slice(0, 16))
}

// // 使用
// const input = Uint8Array.from();
//
// console.log(customHash(input))


import md5 from 'js-md5';
// 你的原始字符串
const longString = 'dee84293c8d15948ee38689ee00b4c793caebebdeedca7b97bc32f7aaed22e04';

// 计算 MD5 哈希值
const md5Hash = md5(longString);
console.log(md5Hash);
// 输出: deb27be0cf042d9a4196981d59dc313b