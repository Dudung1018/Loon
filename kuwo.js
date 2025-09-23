/***********************************
 #!name=酷我纯净版
 #!desc=修改 vip
 #!author=Lonely-Lifer
 #!date=2025-08-23



 [Script]
 # 会员
 http-response ^https?:\/\/vip1\.kuwo\.cn\/vip\/v2\/user\/vip\?op=ui&uid=\d+&sid=\d+&signver=new$ script-path=https://loon.dudung.cloudns.org/kuwo.js, requires-body=true, timeout=60, tag=会员
 http-request ^http?:\/\/nmobi\.kuwo\.cn\/mobi\.s\?f=kuwo&q= script-path=https://loon.dudung.cloudns.org/kuwo.js, requires-body=true, timeout=60, tag=播放

 [MITM]
 hostname = *.kuwo.cn
 ***********************************/

const decrypt = {
    f4894a: 'ylzsxkwm'.split('').map((c) => c.charCodeAt(0)),
    f4895b: 'ylzsxkwm'.split('').map((c) => c.charCodeAt(0)).length,
    f4896c: "kwks&@69".split('').map((c) => c.charCodeAt(0)),
    f4897d: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216, 33554432, 67108864, 134217728, 268435456, 536870912, 1073741824, 2147483648, 4294967296, 8589934592, 17179869184, 34359738368, 68719476736, 137438953472, 274877906944, 549755813888, 1099511627776, 2199023255552, 4398046511104, 8796093022208, 17592186044416, 35184372088832, 70368744177664, 140737488355328, 281474976710656, 562949953421312, 1125899906842624, 2251799813685248, 4503599627370496, 9007199254740992, 18014398509481984, 36028797018963968, 72057594037927936, 144115188075855872, 288230376151711744, 576460752303423488, 1152921504606846976, 2305843009213693952, 4611686018427387904, -9223372036854775808].map(BigInt),
    f4898e: [57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7, 56, 48, 40, 32, 24, 16, 8, 0, 58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6],
    f4899f: [31, 0, 1, 2, 3, 4, -1, -1, 3, 4, 5, 6, 7, 8, -1, -1, 7, 8, 9, 10, 11, 12, -1, -1, 11, 12, 13, 14, 15, 16, -1, -1, 15, 16, 17, 18, 19, 20, -1, -1, 19, 20, 21, 22, 23, 24, -1, -1, 23, 24, 25, 26, 27, 28, -1, -1, 27, 28, 29, 30, 31, 30, -1, -1],
    f4900g: [
        [14, 4, 3, 15, 2, 13, 5, 3, 13, 14, 6, 9, 11, 2, 0, 5, 4, 1, 10, 12, 15, 6, 9, 10, 1, 8, 12, 7, 8, 11, 7, 0, 0, 15, 10, 5, 14, 4, 9, 10, 7, 8, 12, 3, 13, 1, 3, 6, 15, 12, 6, 11, 2, 9, 5, 0, 4, 2, 11, 14, 1, 7, 8, 13],
        [15, 0, 9, 5, 6, 10, 12, 9, 8, 7, 2, 12, 3, 13, 5, 2, 1, 14, 7, 8, 11, 4, 0, 3, 14, 11, 13, 6, 4, 1, 10, 15, 3, 13, 12, 11, 15, 3, 6, 0, 4, 10, 1, 7, 8, 4, 11, 14, 13, 8, 0, 6, 2, 15, 9, 5, 7, 1, 10, 12, 14, 2, 5, 9],
        [10, 13, 1, 11, 6, 8, 11, 5, 9, 4, 12, 2, 15, 3, 2, 14, 0, 6, 13, 1, 3, 15, 4, 10, 14, 9, 7, 12, 5, 0, 8, 7, 13, 1, 2, 4, 3, 6, 12, 11, 0, 13, 5, 14, 6, 8, 15, 2, 7, 10, 8, 15, 4, 9, 11, 5, 9, 0, 14, 3, 10, 7, 1, 12],
        [7, 10, 1, 15, 0, 12, 11, 5, 14, 9, 8, 3, 9, 7, 4, 8, 13, 6, 2, 1, 6, 11, 12, 2, 3, 0, 5, 14, 10, 13, 15, 4, 13, 3, 4, 9, 6, 10, 1, 12, 11, 0, 2, 5, 0, 13, 14, 2, 8, 15, 7, 4, 15, 1, 10, 7, 5, 6, 12, 11, 3, 8, 9, 14],
        [2, 4, 8, 15, 7, 10, 13, 6, 4, 1, 3, 12, 11, 7, 14, 0, 12, 2, 5, 9, 10, 13, 0, 3, 1, 11, 15, 5, 6, 8, 9, 14, 14, 11, 5, 6, 4, 1, 3, 10, 2, 12, 15, 0, 13, 2, 8, 5, 11, 8, 0, 15, 7, 14, 9, 4, 12, 7, 10, 9,1, 13, 6, 3],
        [12, 9, 0, 7, 9, 2, 14, 1, 10, 15, 3, 4, 6, 12, 5, 11, 1, 14, 13, 0, 2, 8, 7, 13, 15, 5, 4, 10, 8, 3, 11, 6, 10, 4, 6, 11, 7, 9, 0, 6, 4, 2, 13, 1, 9, 15, 3, 8, 15, 3, 1, 14, 12, 5, 11, 0, 2, 12, 14, 7, 5, 10, 8, 13],
        [4, 1, 3, 10, 15, 12, 5, 0, 2, 11, 9, 6, 8, 7, 6, 9, 11, 4, 12, 15, 0, 3, 10, 5, 14, 13, 7, 8, 13, 14, 1, 2, 13, 6, 14, 9, 4, 1, 2, 14, 11, 13, 5, 0, 1, 10, 8, 3, 0, 11, 3, 5, 9, 4, 15, 2, 7, 8, 12, 15, 10, 7, 6, 12],
        [13, 7, 10, 0, 6, 9, 5, 15, 8, 4, 3, 10, 11, 14, 12, 5, 2, 11, 9, 6, 15, 12, 0, 3, 4, 1, 14, 13, 1, 2, 7, 8, 1, 2, 12, 15, 10, 4, 0, 3, 13, 14, 6, 9, 7, 8, 9, 6, 15, 1, 5, 12, 3, 10, 14, 5, 8, 7, 11, 0, 4, 13, 2, 11]
    ],
    f4901h: [15, 6, 19, 20, 28, 11, 27, 16, 0, 14, 22, 25, 4, 17, 30, 9, 1, 7, 23, 13, 31, 26, 2, 8, 18, 12, 29, 5, 21, 10, 3, 24],
    f4902i: [39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25, 32, 0, 40, 8, 48, 16, 56, 24],
    j: [56, 48, 40, 32, 24, 16, 8, 0, 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 60, 52, 44, 36, 28, 20, 12, 4, 27, 19, 11, 3],
    k: [13, 16, 10, 23, 0, 4, -1, -1, 2, 27, 14, 5, 20, 9, -1, -1, 22, 18, 11, 3, 25, 7, -1, -1, 15, 6, 26, 19, 12, 1, -1, -1, 40, 51, 30, 36, 46, 54, -1, -1, 29, 39, 50, 44, 32, 47, -1, -1, 43, 48, 38, 55, 33, 52, -1, -1, 45, 41, 49, 35, 28, 31, -1, -1],
    l: [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
    m: [0, 1048577, 3145731],
    n: 0,
    o: 1,
    p: 0,
    q: null,
    r: null,
    s: new Array(2), // 创建一个长度为 2 的数组
    t: new Array(8),  // 创建一个长度为 8 的数组
    u: null,
    v: null,
    w: null,

    a0: function (iArr, i2, j2) {
        let j3 = 0n; // long -> BigInt
        for (let i3 = 0; i3 < i2; i3++) {
            if (iArr[i3] >= 0 && decrypt.f4897d[iArr[i3]] !== undefined) {
                if (iArr[i3] >= 0 && (BigInt(decrypt.f4897d[iArr[i3]]) & j2) !== 0n) {
                    j3 |= decrypt.f4897d[i3];
                }
            }

        }
        return j3;
    }
    ,
    a1: function (j2, jArr, i2) {
        let a2 = decrypt.a0(this.j, 56, j2);
        for (let i3 = 0; i3 < 16; i3++) {
            a2 = ((a2 & (~BigInt(this.m[this.l[i3]]))) >> BigInt(this.l[i3])) |
                ((BigInt(this.m[this.l[i3]]) & a2) << (BigInt(28) - BigInt(this.l[i3])));
            jArr[i3] = decrypt.a0(this.k, 64, a2);
        }
        if (i2 === 1) {
            for (let i4 = 0; i4 < 8; i4++) {
                let j3 = jArr[i4];
                let i5 = 15 - i4;
                jArr[i4] = jArr[i5];
                jArr[i5] = j3;
            }
        }
    }
    ,
    a2: function (jArr, j2) {
        // p = 调用 a(f4898e, 64, j2)
        decrypt.p = decrypt.a0(decrypt.f4898e, 64, j2);

        // s[0] = (int)(p & 0xffffffff)
        decrypt.s[0] = Number(decrypt.p & 0xFFFFFFFFn);

        // s[1] = (int)((p & 0xffffffff00000000) >> 32)
        decrypt.s[1] = Number(BigInt.asIntN(32, decrypt.p >> 32n));

        for (let i2 = 0; i2 < 16; i2++) {
            // r = (long) s[1]
            decrypt.r = BigInt(decrypt.s[1]);

            // r = a(f4899f, 64, r)
            decrypt.r = decrypt.a0(decrypt.f4899f, 64, this.r);

            // r ^= jArr[i2]
            decrypt.r ^= BigInt(jArr[i2]);

            // t[i3] = (byte)((r >> (i3*8)) & 0xff)
            for (let i3 = 0; i3 < 8; i3++) {
                decrypt.t[i3] = Number((decrypt.r >> BigInt(i3 * 8)) & 0xFFn);
            }

            decrypt.u = 0;
            let i4 = 7;
            while (true) {
                decrypt.w = i4;
                if (decrypt.w < 0) {
                    break;
                }
                decrypt.u <<= 4;
                decrypt.u |= decrypt.f4900g[decrypt.w][decrypt.t[decrypt.w]];
                i4 = decrypt.w - 1;
            }

            // r = (long) u
            decrypt.r = BigInt(decrypt.u);

            // r = a(f4901h, 32, r)
            decrypt.r = decrypt.a0(decrypt.f4901h, 32, decrypt.r);

            // q = (long) s[0]
            decrypt.q = BigInt(decrypt.s[0]);

            // s[0] = s[1]
            decrypt.s[0] = decrypt.s[1];

            // s[1] = (int)(q ^ r)
            decrypt.s[1] = (Number(this.q & 0xFFFFFFFFn) ^ Number(this.r & 0xFFFFFFFFn)) | 0;
        }

        // 交换 s[0] 和 s[1]
        decrypt.v = decrypt.s[0];
        decrypt.s[0] = decrypt.s[1];
        decrypt.s[1] = decrypt.v;

        // p = (((long)s[0] & 0xffffffff) | (((long)s[1] << 32) & 0xffffffff00000000))
        decrypt.p = (BigInt(decrypt.s[0]) & 0xFFFFFFFFn) |
            ((BigInt(decrypt.s[1]) << 32n) & 0xFFFFFFFF00000000n);

        // p = a(f4902i, 64, p)
        decrypt.p = decrypt.a0(decrypt.f4902i, 64, decrypt.p);

        return decrypt.p;
    }
    ,
    a3: function (bArr, i2, bArr2, i3) {
        let j2 = 0n;

        // bArr2 前 8 字节拼成 long
        for (let i4 = 0; i4 < 8; i4++) {
            j2 |= BigInt(bArr2[i4] & 0xff) << BigInt(i4 * 8);
        }

        let i5 = Math.floor(i2 / 8);

        // jArr 初始化为 16 个 0
        let jArr = new Array(16).fill(0);

        // jArr2 保存 bArr 分组转 long
        let jArr2 = new Array(i5);
        for (let i7 = 0; i7 < i5; i7++) {
            for (let i8 = 0; i8 < 8; i8++) {
                jArr2[i7] = (jArr2[i7] ?? 0n) | BigInt(bArr[(i7 * 8) + i8] & 0xff) << BigInt(i8 * 8);
            }
        }

        // jArr3 大小 = (((i5 + 1) * 8) + 1) / 8
        let jArr3 = new Array(Math.floor((((i5 + 1) * 8) + 1) / 8));

        // 调用 a(j2, jArr, 0) 生成子密钥
        decrypt.a1(j2, jArr, 0);

        // 每个 8 字节分组加密
        for (let i9 = 0; i9 < i5; i9++) {
            jArr3[i9] = decrypt.a2(jArr, jArr2[i9]);
        }

        let i10 = i2 % 8;
        let i11 = i5 * 8;
        let i12 = i2 - i11;

        // 剩余的字节
        let bArr4 = bArr.slice(i11, i11 + i12);

        let j3 = 0n;
        for (let i13 = 0; i13 < i10; i13++) {
            j3 |= BigInt(bArr4[i13] & 0xff) << BigInt(i13 * 8);
        }

        // 处理最后不足 8 字节的部分
        jArr3[i5] = decrypt.a2(jArr, j3);

        // 输出结果 bArr3
        let bArr3 = new Int8Array(jArr3.length * 8);
        let i15 = 0;
        for (let i14 = 0; i14 < jArr3.length; i14++) {
            for (let i17 = 0; i17 < 8; i17++) {
                let val = Number((jArr3[i14] >> BigInt(i17 * 8)) & 0xFFn);
                // 模拟 Java 的 (byte) 转换
                bArr3[i15++] = val > 127 ? val - 256 : val;
            }
        }

        return bArr3;
    }
    ,
    b: function (bArr, i2, bArr2, i3) {
        let j2 = 0n;

        // 将 bArr2 前 8 字节组合成 long
        for (let i4 = 0; i4 < 8; i4++) {
            j2 |= BigInt(bArr2[i4] & 0xff) << BigInt(i4 * 8);
        }

        let i5 = Math.floor(i2 / 8);

        // jArr 初始化为 16 个 0n
        let jArr = new Array(16);

        // jArr2 保存 bArr 分组转 long
        let jArr2 = new Array(i5);
        for (let i7 = 0; i7 < i5; i7++) {
            for (let i8 = 0; i8 < 8; i8++) {
                jArr2[i7] |= BigInt(bArr[i7 * 8 + i8] & 0xff) << BigInt(i8 * 8);
            }
        }

        // jArr3 大小 = (((i5 + 1) * 8) + 1) / 8
        let jArr3 = new Array(Math.floor((((i5 + 1) * 8) + 1) / 8));

        // 调用 a(j2, jArr, 0) 生成子密钥
        this.a1(j2, jArr, 0);

        // 每个 8 字节分组加密
        for (let i9 = 0; i9 < i5; i9++) {
            jArr3[i9] = this.a2(jArr, jArr2[i9]);
        }

        // 剩余不足 8 字节
        let i10 = i2 % 8;
        let i11 = i5 * 8;
        let i12 = i2 - i11;

        let bArr4 = bArr.slice(i11, i11 + i12);

        let j3 = 0n;
        for (let i13 = 0; i13 < i10; i13++) {
            j3 |= BigInt(bArr4[i13] & 0xff) << BigInt(i13 * 8);
        }

        // 处理最后不足 8 字节的部分
        jArr3[i5] = this.a2(jArr, j3);

        // 输出结果 bArr3
        let bArr3 = new Uint8Array(jArr3.length * 8);
        let i15 = 0;
        for (let i14 = 0; i14 < jArr3.length; i14++) {
            for (let i17 = 0; i17 < 8; i17++) {
                bArr3[i15] = Number((jArr3[i14] >> BigInt(i17 * 8)) & 0xffn);
                i15++;
            }
        }
        return bArr3;
    }
    ,
    b1:function (bArr,bArr2) {
        const length = bArr.length;
        const jArr = new Array(16).fill(BigInt(0));
        let j2 = BigInt(0);
        for (let i2 = 0; i2 < 8; i2++) {
            j2 |= BigInt(bArr2[i2]) << BigInt(i2 * 8);
        }
        decrypt.a1(j2, jArr, 1);
        const i4 = Math.floor(length / 8);
        const jArr2 = new Array(i4).fill(BigInt(0));
        for (let i5 = 0; i5 < i4; i5++) {
            for (let i6 = 0; i6 < 8; i6++) {
                jArr2[i5] |= BigInt(bArr[(i5 * 8) + i6] & 255) << BigInt(i6 * 8);
            }
        }
        const jArr3 = new Array(i4);
        for (let i7 = 0; i7 < i4; i7++) {
            jArr3[i7] = decrypt.a2(jArr, jArr2[i7]);
        }
        const bArr3 = new Uint8Array(i4 * 8);
        for (let i8 = 0; i8 < i4; i8++) {
            for (let i9 = 0; i9 < 8; i9++) {
                bArr3[(i8 * 8) + i9] = Number(BigInt(255) & (jArr3[i8] >> BigInt(i9 * 8)));
            }
        }
        return bArr3;

    }

}
const decrypt2 = {
    f4891a: 'mobile',
    f4892b: new Array(64),
    f4893c: new Array(128),
    init() {
        let i2 = 0;
        for (let c = 'A'.charCodeAt(0); c <= 'Z'.charCodeAt(0); c++) {
            decrypt2.f4892b[i2++] = String.fromCharCode(c);
        }
        for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
            decrypt2.f4892b[i2++] = String.fromCharCode(c);
        }
        for (let c = '0'.charCodeAt(0); c <= '9'.charCodeAt(0); c++) {
            decrypt2.f4892b[i2++] = String.fromCharCode(c);
        }
        decrypt2.f4892b[i2++] = '+';
        decrypt2.f4892b[i2++] = '/';

        for (let i = 0; i < 64; i++) {
            decrypt2.f4893c[decrypt2.f4892b[i].charCodeAt(0)] = i;
        }
    },
    a: function (bArr, i2, str) {
        // 如果 str 不为空，先做异或处理
        if (str && str !== '') {
            const bytes = Array.from(str).map(c => c.charCodeAt(0));
            let i7 = 0;
            for (let i8 = 0; i8 < bArr.length; i8 = i7) {
                i7 = i8;
                let i9 = 0;
                while (i9 < bytes.length && i7 < bArr.length) {
                    bArr[i7] = bArr[i7] ^ bytes[i9];
                    i9++;
                    i7++;
                }
            }
        }

        // 计算输出长度
        const i10 = Math.floor(((i2 * 4) + 2) / 3);
        const cArr = new Array(Math.ceil(i2 / 3) * 4);
        let i11 = 0;
        let i12 = 0;
        while (i11 < i2) {
            let i13 = i11 + 1;
            let i14 = bArr[i11] & 0xFF;
            let i3, i4;
            if (i13 < i2) {
                i3 = i13 + 1;
                i4 = bArr[i13] & 0xFF;
            } else {
                i3 = i13;
                i4 = 0;
            }

            let i5, i6;
            if (i3 < i2) {
                i5 = i3 + 1;
                i6 = bArr[i3] & 0xFF;
            } else {
                i5 = i3;
                i6 = 0;
            }

            let i15 = i14 >>> 2;
            let i16 = ((i14 & 0x03) << 4) | (i4 >>> 4);
            let i17 = ((i4 & 0x0F) << 2) | (i6 >>> 6);
            let i18 = i6 & 0x3F;

            let i19 = i12 + 1;
            cArr[i12] = decrypt2.f4892b[i15];
            let i20 = i19 + 1;
            cArr[i19] = decrypt2.f4892b[i16];

            let c2 = '=';
            cArr[i20] = i20 < i10 ? decrypt2.f4892b[i17] : '=';
            let i21 = i20 + 1;
            if (i21 < i10) {
                c2 = decrypt2.f4892b[i18];
            }
            cArr[i21] = c2;

            i12 = i21 + 1;
            i11 = i5;
        }
        return cArr;
    },
    a1: function(bArr,i2) {
        return decrypt2.a(bArr, i2, null);
    }
}
function base64ToUint8Array(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

let $ = new Env('酷我纯净版')
let url = $request.url
if (url.indexOf('/user/vip') !== -1) {
    let body = $response.body
    let data = JSON.parse(body)
    let json = data.data
    json.isNewUser = '1'
    json.vipOverSeasExpire = 1767139200000;
    json.isYearUser = '1'
    json.vipExpire = 1767139200000;
    json.vip3Expire = 1767139200000;
    json.biedAlbum = 1767139200000;
    json.vipmAutoPayUser = 1767139200000;
    json.vipmExpire = 1767139200000;
    json.vipLuxuryExpire = 1767139200000;
    json.luxAutoPayUser = '1'
    json.vipWatch1Expire = 1767139200000;
    json.vipAdExpire = 1767139200000;
    json.svipAutoPayUser = '1'
    json.svipExpire = 1767139200000;
    json.biedSong = 1767139200000;
    json.vipAdAutoPayUser = '1'
    json.experienceExpire = 1767139200000;
    data.data = json
    $.done({body: JSON.stringify(data)})
}
if (url.indexOf('/mobi.s') !== -1) {
    const request = new URL(url);
    let q = request.searchParams.get('q');
    const encryptedData = base64ToUint8Array(q);
    const key = new TextEncoder().encode("ylzsxkwm");
    let decryptedString;
    try {
        const decryptedData = decrypt.b1(encryptedData, key);
        let textDecoder = new TextDecoder('utf-8');
        decryptedString = textDecoder.decode(decryptedData);
    } catch (error) {
        $.error('解密过程中出错:', error);
        $.done();
    }
    const params = new URLSearchParams(decryptedString);
    params.set('source', 'kwplayercar_ar_6.0.0.9_B_jiakong_vh.apk');
    params.set('user', 'C_APK_guanwang_12609069939969033731');
    //加密
    const decryptedData = new TextEncoder().encode(params.toString());
    const encryptedNewData = decrypt.a3(decryptedData, decryptedData.length, key, key.length);
    const newQ = decrypt2.a1(encryptedNewData,encryptedNewData.length).join('');
    $.log(newQ)
    request.searchParams.set('q', newQ);
    const newUrl = request.toString();
    $.done({url: newUrl});
}

function Env(a, b) {
    var c = Math.floor;
    return new class {
        constructor(a, b) {
            this.name = a, this.version = "1.7.4", this.data = null, this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "", this.encoding = "utf-8", this.startTime = new Date().getTime(), Object.assign(this, b), this.log("", "🔔" + this.name + ", 开始!")
        }

        platform() {
            return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" == typeof module || !module.exports ? "undefined" == typeof $task ? "undefined" == typeof $loon ? "undefined" == typeof $rocket ? "undefined" == typeof Egern ? void 0 : "Egern" : "Shadowrocket" : "Loon" : "Quantumult X" : "Node.js"
        }

        isQuanX() {
            return "Quantumult X" === this.platform()
        }

        isSurge() {
            return "Surge" === this.platform()
        }

        isLoon() {
            return "Loon" === this.platform()
        }

        isShadowrocket() {
            return "Shadowrocket" === this.platform()
        }

        isStash() {
            return "Stash" === this.platform()
        }

        isEgern() {
            return "Egern" === this.platform()
        }

        toObj(a, b = null) {
            try {
                return JSON.parse(a)
            } catch {
                return b
            }
        }

        toStr(a, b = null) {
            try {
                return JSON.stringify(a)
            } catch {
                return b
            }
        }

        lodash_get(a = {}, b = "", c = void 0) {
            Array.isArray(b) || (b = this.toPath(b));
            const d = b.reduce((a, b) => Object(a)[b], a);
            return d === void 0 ? c : d
        }

        lodash_set(a = {}, b = "", c) {
            return Array.isArray(b) || (b = this.toPath(b)), b.slice(0, -1).reduce((a, c, d) => Object(a[c]) === a[c] ? a[c] : a[c] = /^d+$/.test(b[d + 1]) ? [] : {}, a)[b[b.length - 1]] = c, a
        }

        toPath(a) {
            return a.replace(/[(d+)]/g, ".$1").split(".").filter(Boolean)
        }

        getItem(a = new String, b = null) {
            let c = b;
            switch (a.startsWith("@")) {
                case!0:
                    const {key: b, path: d} = a.match(/^@(?<key>[^.]+)(?:.(?<path>.*))?$/)?.groups;
                    a = b;
                    let e = this.getItem(a, {});
                    "object" != typeof e && (e = {}), c = this.lodash_get(e, d);
                    try {
                        c = JSON.parse(c)
                    } catch (a) {
                    }
                    break;
                default:
                    switch (this.platform()) {
                        case"Surge":
                        case"Loon":
                        case"Stash":
                        case"Egern":
                        case"Shadowrocket":
                            c = $persistentStore.read(a);
                            break;
                        case"Quantumult X":
                            c = $prefs.valueForKey(a);
                            break;
                        default:
                            c = this.data?.[a] || null
                    }
                    try {
                        c = JSON.parse(c)
                    } catch (a) {
                    }
            }
            return c ?? b
        }

        setItem(a = new String, b = new String) {
            let c = !1;
            switch (typeof b) {
                case"object":
                    b = JSON.stringify(b);
                    break;
                default:
                    b = b + ""
            }
            switch (a.startsWith("@")) {
                case!0:
                    const {key: d, path: e} = a.match(/^@(?<key>[^.]+)(?:.(?<path>.*))?$/)?.groups;
                    a = d;
                    let f = this.getItem(a, {});
                    "object" != typeof f && (f = {}), this.lodash_set(f, e, b), c = this.setItem(a, f);
                    break;
                default:
                    switch (this.platform()) {
                        case"Surge":
                        case"Loon":
                        case"Stash":
                        case"Egern":
                        case"Shadowrocket":
                            c = $persistentStore.write(b, a);
                            break;
                        case"Quantumult X":
                            c = $prefs.setValueForKey(b, a);
                            break;
                        default:
                            c = this.data?.[a] || null
                    }
            }
            return c
        }

        async fetch(a = {}, b = {}) {
            switch (a.constructor) {
                case Object:
                    a = {...a, ...b};
                    break;
                case String:
                    a = {url: a, ...b}
            }
            a.method || (a.method = a.body ?? a.bodyBytes ? "POST" : "GET"), delete a.headers?.Host, delete a.headers?.[":authority"], delete a.headers?.["Content-Length"], delete a.headers?.["content-length"];
            const c = a.method.toLocaleLowerCase();
            switch (this.platform()) {
                case"Loon":
                case"Surge":
                case"Stash":
                case"Egern":
                case"Shadowrocket":
                default:
                    return a.policy && (this.isLoon() && (a.node = a.policy), this.isStash() && this.lodash_set(a, "headers.X-Stash-Selected-Proxy", encodeURI(a.policy))), a.followRedirect && ((this.isSurge() || this.isLoon()) && (a["auto-redirect"] = !1), this.isQuanX() && (a.opts ? a.opts.redirection = !1 : a.opts = {redirection: !1})), a.bodyBytes && !a.body && (a.body = a.bodyBytes, delete a.bodyBytes), await new Promise((b, d) => {
                        $httpClient[c](a, (c, e, f) => {
                            c ? d(c) : (e.ok = /^2dd$/.test(e.status), e.statusCode = e.status, f && (e.body = f, !0 == a["binary-mode"] && (e.bodyBytes = f)), b(e))
                        })
                    });
                case"Quantumult X":
                    return a.policy && this.lodash_set(a, "opts.policy", a.policy), "boolean" == typeof a["auto-redirect"] && this.lodash_set(a, "opts.redirection", a["auto-redirect"]), a.body instanceof ArrayBuffer ? (a.bodyBytes = a.body, delete a.body) : ArrayBuffer.isView(a.body) ? (a.bodyBytes = a.body.buffer.slice(a.body.byteOffset, a.body.byteLength + a.body.byteOffset), delete object.body) : a.body && delete a.bodyBytes, await $task.fetch(a).then(a => (a.ok = /^2dd$/.test(a.statusCode), a.status = a.statusCode, a), a => Promise.reject(a.error))
            }
        }

        time(a, b = null) {
            const d = b ? new Date(b) : new Date;
            let e = {
                "M+": d.getMonth() + 1,
                "d+": d.getDate(),
                "H+": d.getHours(),
                "m+": d.getMinutes(),
                "s+": d.getSeconds(),
                "q+": c((d.getMonth() + 3) / 3),
                S: d.getMilliseconds()
            };
            for (let c in /(y+)/.test(a) && (a = a.replace(RegExp.$1, (d.getFullYear() + "").slice(4 - RegExp.$1.length))), e) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? e[c] : ("00" + e[c]).slice(("" + e[c]).length)));
            return a
        }

        getBaseURL(a) {
            return a.replace(/[?#].*$/, "")
        }

        isAbsoluteURL(a) {
            return /^[a-z][a-z0-9+.-]*:/.test(a)
        }

        getURLParameters(a) {
            return (a.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((b, a) => (b[a.slice(0, a.indexOf("="))] = a.slice(a.indexOf("=") + 1), b), {})
        }

        getTimestamp(a = new Date) {
            return c(a.getTime() / 1e3)
        }

        queryStr(a) {
            let b = [];
            for (let c in a) a.hasOwnProperty(c) && b.push(c + '=' + a[c]);
            let c = b.join("&");
            return c
        }

        queryObj(a) {
            let b = {}, c = a.split("&");
            for (let d of c) {
                let a = d.split("="), c = a[0], e = a[1] || "";
                c && (b[c] = e)
            }
            return b
        }

        msg(a = this.name, b = "", c = "", d) {
            const e = a => {
                switch (typeof a) {
                    case void 0:
                        return a;
                    case"string":
                        switch (this.platform()) {
                            case"Surge":
                            case"Stash":
                            case"Egern":
                            default:
                                return {url: a};
                            case"Loon":
                            case"Shadowrocket":
                                return a;
                            case"Quantumult X":
                                return {"open-url": a}
                        }
                    case"object":
                        switch (this.platform()) {
                            case"Surge":
                            case"Stash":
                            case"Egern":
                            case"Shadowrocket":
                            default: {
                                let b = a.url || a.openUrl || a["open-url"];
                                return {url: b}
                            }
                            case"Loon": {
                                let b = a.openUrl || a.url || a["open-url"], c = a.mediaUrl || a["media-url"];
                                return {openUrl: b, mediaUrl: c}
                            }
                            case"Quantumult X": {
                                let b = a["open-url"] || a.url || a.openUrl, c = a["media-url"] || a.mediaUrl,
                                    d = a["update-pasteboard"] || a.updatePasteboard;
                                return {"open-url": b, "media-url": c, "update-pasteboard": d}
                            }
                        }
                    default:
                }
            };
            if (!this.isMute) switch (this.platform()) {
                case"Surge":
                case"Loon":
                case"Stash":
                case"Shadowrocket":
                default:
                    $notification.post(a, b, c, e(d));
                    break;
                case"Quantumult X":
                    $notify(a, b, c, e(d))
            }
        }

        log(...a) {
            0 < a.length && (this.logs = [...this.logs, ...a]), console.log(a.join(this.logSeparator))
        }

        logErr(a, b) {
            switch (this.platform()) {
                case"Surge":
                case"Loon":
                case"Stash":
                case"Egern":
                case"Shadowrocket":
                case"Quantumult X":
                default:
                    this.log("", "❗️" + this.name + ", 错误!", a, b)
            }
        }

        wait(a) {
            return new Promise(b => setTimeout(b, a))
        }

        done(a = {}) {
            const b = new Date().getTime(), c = (b - this.startTime) / 1e3;
            switch (this.log("", "🔔" + this.name + ", 结束! 🕛" + c + "秒"), this.platform()) {
                case"Surge":
                    a.policy && this.lodash_set(a, "headers.X-Surge-Policy", a.policy), $done(a);
                    break;
                case"Loon":
                    a.policy && (a.node = a.policy), $done(a);
                    break;
                case"Stash":
                    a.policy && this.lodash_set(a, "headers.X-Stash-Selected-Proxy", encodeURI(a.policy)), $done(a);
                    break;
                case"Egern":
                    $done(a);
                    break;
                case"Shadowrocket":
                default:
                    $done(a);
                    break;
                case"Quantumult X":
                    a.policy && this.lodash_set(a, "opts.policy", a.policy), delete a["auto-redirect"], delete a["auto-cookie"], delete a["binary-mode"], delete a.charset, delete a.host, delete a.insecure, delete a.method, delete a.opt, delete a.path, delete a.policy, delete a["policy-descriptor"], delete a.scheme, delete a.sessionIndex, delete a.statusCode, delete a.timeout, a.body instanceof ArrayBuffer ? (a.bodyBytes = a.body, delete a.body) : ArrayBuffer.isView(a.body) ? (a.bodyBytes = a.body.buffer.slice(a.body.byteOffset, a.body.byteLength + a.body.byteOffset), delete a.body) : a.body && delete a.bodyBytes, $done(a)
            }
        }
    }(a, b)
}