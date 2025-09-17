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

/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */

const PlaybackStateCompat = {ACTION_SET_CAPTIONING_ENABLED: 1048576};
const IjkMediaMeta = {
    AV_CH_STEREO_LEFT: 536870912,
    AV_CH_STEREO_RIGHT: 1073741824,
    AV_CH_WIDE_LEFT: 2147483648,
    AV_CH_WIDE_RIGHT: 4294967296,
    AV_CH_SURROUND_DIRECT_LEFT: 8589934592,
    AV_CH_SURROUND_DIRECT_RIGHT: 17179869184
};

// In JavaScript, all numbers are 64-bit floating-point numbers.
// Bitwise operations are performed on 32-bit integers, so we need to be careful with numbers larger than 2^32.
// The code below uses BigInt for larger numbers to maintain precision.
const JSAbstractArray = {MAX_JS_ARRAY_LENGTH: 4294967295}; // 2^32 - 1

function intTo32Bit(n) {
    return n | 0;
}

const decrypt = {
    a: 'ylzsxkwm'.split('').map((c) => c.charCodeAt(0)),
    b: 'ylzsxkwm'.length,
    c: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216, 33554432, 67108864, 134217728, 268435456, 536870912, 1073741824, 2147483648, 4294967296, 8589934592, 17179869184, 34359738368, 68719476736, 137438953472, 274877906944, 549755813888, 1099511627776, 2199023255552, 4398046511104, 8796093022208, 17592186044416, 35184372088832, 70368744177664, 140737488355328, 281474976710656, 562949953421312, 1125899906842624, 2251799813685248, 4503599627370496, 9007199254740992, 18014398509481984, 36028797018963968, 72057594037927936, 144115188075855872, 288230376151711744, 576460752303423488, 1152921504606846976, 2305843009213693952, 4611686018427387904, -9223372036854775808].map(BigInt),
    d: [57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7, 56, 48, 40, 32, 24, 16, 8, 0, 58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6],
    e: [31, 0, 1, 2, 3, 4, -1, -1, 3, 4, 5, 6, 7, 8, -1, -1, 7, 8, 9, 10, 11, 12, -1, -1, 11, 12, 13, 14, 15, 16, -1, -1, 15, 16, 17, 18, 19, 20, -1, -1, 19, 20, 21, 22, 23, 24, -1, -1, 23, 24, 25, 26, 27, 28, -1, -1, 27, 28, 29, 30, 31, 30, -1, -1],
    f: [
        [14, 4, 3, 15, 2, 13, 5, 3, 13, 14, 6, 9, 11, 2, 0, 5, 4, 1, 10, 12, 15, 6, 9, 10, 1, 8, 12, 7, 8, 11, 7, 0, 0, 15, 10, 5, 14, 4, 9, 10, 7, 8, 12, 3, 13, 1, 3, 6, 15, 12, 6, 11, 2, 9, 5, 0, 4, 2, 11, 14, 1, 7, 8, 13],
        [15, 0, 9, 5, 6, 10, 12, 9, 8, 7, 2, 12, 3, 13, 5, 2, 1, 14, 7, 8, 11, 4, 0, 3, 14, 11, 13, 6, 4, 1, 10, 15, 3, 13, 12, 11, 15, 3, 6, 0, 4, 10, 1, 7, 8, 4, 11, 14, 13, 8, 0, 6, 2, 15, 9, 5, 7, 1, 10, 12, 14, 2, 5, 9],
        [10, 13, 1, 11, 6, 8, 11, 5, 9, 4, 12, 2, 15, 3, 2, 14, 0, 6, 13, 1, 3, 15, 4, 10, 14, 9, 7, 12, 5, 0, 8, 7, 13, 1, 2, 4, 3, 6, 12, 11, 0, 13, 5, 14, 6, 8, 15, 2, 7, 10, 8, 15, 4, 9, 11, 5, 9, 0, 14, 3, 10, 7, 1, 12],
        [7, 10, 1, 15, 0, 12, 11, 5, 14, 9, 8, 3, 9, 7, 4, 8, 13, 6, 2, 1, 6, 11, 12, 2, 3, 0, 5, 14, 10, 13, 15, 4, 13, 3, 4, 9, 6, 10, 1, 12, 11, 0, 2, 5, 0, 13, 14, 2, 8, 15, 7, 4, 15, 1, 10, 7, 5, 6, 12, 11, 3, 8, 9, 14],
        [2, 4, 8, 15, 7, 10, 13, 6, 4, 1, 3, 12, 11, 7, 14, 0, 12, 2, 5, 9, 10, 13, 0, 3, 1, 11, 15, 5, 6, 8, 9, 14, 14, 11, 5, 6, 4, 1, 3, 10, 2, 12, 15, 0, 13, 2, 8, 5, 11, 8, 0, 15, 7, 14, 9, 4, 12, 7, 10, 9, 1, 13, 6, 3],
        [12, 9, 0, 7, 9, 2, 14, 1, 10, 15, 3, 4, 6, 12, 5, 11, 1, 14, 13, 0, 2, 8, 7, 13, 15, 5, 4, 10, 8, 3, 11, 6, 10, 4, 6, 11, 7, 9, 0, 6, 4, 2, 13, 1, 9, 15, 3, 8, 15, 3, 1, 14, 12, 5, 11, 0, 2, 12, 14, 7, 5, 10, 8, 13],
        [4, 1, 3, 10, 15, 12, 5, 0, 2, 11, 9, 6, 8, 7, 6, 9, 11, 4, 12, 15, 0, 3, 10, 5, 14, 13, 7, 8, 13, 14, 1, 2, 13, 6, 14, 9, 4, 1, 2, 14, 11, 13, 5, 0, 1, 10, 8, 3, 0, 11, 3, 5, 9, 4, 15, 2, 7, 8, 12, 15, 10, 7, 6, 12],
        [13, 7, 10, 0, 6, 9, 5, 15, 8, 4, 3, 10, 11, 14, 12, 5, 2, 11, 9, 6, 15, 12, 0, 3, 4, 1, 14, 13, 1, 2, 7, 8, 1, 2, 12, 15, 10, 4, 0, 3, 13, 14, 6, 9, 7, 8, 9, 6, 15, 1, 5, 12, 3, 10, 14, 5, 8, 7, 11, 0, 4, 13, 2, 11],
    ],
    g: [15, 6, 19, 20, 28, 11, 27, 16, 0, 14, 22, 25, 4, 17, 30, 9, 1, 7, 23, 13, 31, 26, 2, 8, 18, 12, 29, 5, 21, 10, 3, 24],
    h: [39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25, 32, 0, 40, 8, 48, 16, 56, 24],
    i: [56, 48, 40, 32, 24, 16, 8, 0, 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 60, 52, 44, 36, 28, 20, 12, 4, 27, 19, 11, 3],
    j: [13, 16, 10, 23, 0, 4, -1, -1, 2, 27, 14, 5, 20, 9, -1, -1, 22, 18, 11, 3, 25, 7, -1, -1, 15, 6, 26, 19, 12, 1, -1, -1, 40, 51, 30, 36, 46, 54, -1, -1, 29, 39, 50, 44, 32, 47, -1, -1, 43, 48, 38, 55, 33, 52, -1, -1, 45, 41, 49, 35, 28, 31, -1, -1],
    k: [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
    l: [BigInt(0), BigInt(1048577), BigInt(3145731)],
    m: BigInt(0),
    p: [0, 0],
    q: new Uint8Array(8),
    u: 'kwks&@69'.split('').map((c) => c.charCodeAt(0)),

    aFunc1: function a(iArr, i2, j2) {
        let j3 = BigInt(0);
        for (let i3 = 0; i3 < i2; i3++) {
            if (iArr[i3] >= 0) {
                const jArr = decrypt.c;
                if ((jArr[iArr[i3]] & j2) !== BigInt(0)) {
                    j3 |= jArr[i3];
                }
            }
        }
        return j3;
    },

    // Encryption function, similar to Java's b method
    bFunc: function b(bArr, i2, bArr2) {
        let j2 = BigInt(0);
        for (let i4 = 0; i4 < 8; i4++) {
            j2 |= BigInt(bArr2[i4]) << BigInt(i4 * 8);
        }
        const i5 = Math.floor(i2 / 8);
        const jArr = new Array(16).fill(BigInt(0));
        const jArr2 = new Array(i5).fill(BigInt(0));
        for (let i7 = 0; i7 < i5; i7++) {
            for (let i8 = 0; i8 < 8; i8++) {
                jArr2[i7] |= BigInt(bArr[(i7 * 8) + i8] & 255) << BigInt(i8 * 8);
            }
        }
        const jArr3 = new Array(Math.floor(((i5 + 1) * 8 + 1) / 8)).fill(BigInt(0));
        decrypt.aFunc2(j2, jArr, 0);
        for (let i9 = 0; i9 < i5; i9++) {
            jArr3[i9] = decrypt.aFunc4(jArr, jArr2[i9]);
        }
        const i10 = i2 % 8;
        if (i10 > 0) {
            const i11 = i5 * 8;
            const r9 = bArr.slice(i11, i11 + i10);
            let j3 = BigInt(0);
            for (let i13 = 0; i13 < i10; i13++) {
                j3 |= BigInt(r9[i13] & 255) << BigInt(i13 * 8);
            }
            jArr3[i5] = decrypt.aFunc4(jArr, j3);
        }
        const bArr3 = new Uint8Array(jArr3.length * 8);
        let i15 = 0;
        for (let i14 = 0; i14 < jArr3.length; i14++) {
            for (let i17 = 0; i17 < 8; i17++) {
                bArr3[i15] = Number(BigInt(255) & (jArr3[i14] >> BigInt(i17 * 8)));
                i15++;
            }
        }
        return bArr3;
    },

    aFunc2: function a(j2, jArr, i2) {
        let jA = decrypt.aFunc1(decrypt.i, 56, j2);
        for (let i3 = 0; i3 < 16; i3++) {
            const jArr2 = decrypt.l;
            const iArr = decrypt.k;
            const shift = BigInt(28 - iArr[i3]);
            const mask = jArr2[iArr[i3]];
            jA = ((jA & (~mask)) >> BigInt(iArr[i3])) | ((mask & jA) << shift);
            jArr[i3] = decrypt.aFunc3(decrypt.j, 64, jA);
        }
        if (i2 === 1) {
            for (let i4 = 0; i4 < 8; i4++) {
                const j3 = jArr[i4];
                const i5 = 15 - i4;
                jArr[i4] = jArr[i5];
                jArr[i5] = j3;
            }
        }
    },

    aFunc3: function a(iArr, i2, j2) {
        let j3 = BigInt(0);
        for (let i3 = 0; i3 < i2; i3++) {
            if (iArr[i3] >= 0) {
                const jArr = decrypt.c;
                if ((jArr[iArr[i3]] & j2) !== BigInt(0)) {
                    j3 |= jArr[i3];
                }
            }
        }
        return j3;
    },

    aFunc4: function a(jArr, j2) {
        decrypt.m = decrypt.aFunc1(decrypt.d, 64, j2);
        const iArr = decrypt.p;
        const j3 = decrypt.m;
        iArr[0] = Number(j3 & BigInt(JSAbstractArray.MAX_JS_ARRAY_LENGTH));
        iArr[1] = Number((j3 & BigInt(JSAbstractArray.MAX_JS_ARRAY_LENGTH << 32)) >> BigInt(32));
        for (let i2 = 0; i2 < 16; i2++) {
            decrypt.o = BigInt(iArr[1]);
            decrypt.o = decrypt.aFunc1(decrypt.e, 64, decrypt.o);
            decrypt.o ^= jArr[i2];
            for (let i3 = 0; i3 < 8; i3++) {
                decrypt.q[i3] = Number(BigInt(255) & (decrypt.o >> BigInt(i3 * 8)));
            }
            decrypt.r = 0;
            for (let i4 = 7; i4 >= 0; i4--) {
                decrypt.r <<= 4;
                decrypt.r |= decrypt.f[i4][decrypt.q[i4]];
            }
            decrypt.o = BigInt(decrypt.r);
            decrypt.o = decrypt.aFunc1(decrypt.g, 32, decrypt.o);
            const iArr2 = decrypt.p;
            decrypt.n = iArr2[0];
            iArr2[0] = iArr2[1];
            iArr2[1] = intTo32Bit(Number(BigInt(decrypt.n) ^ decrypt.o));
        }
        const iArr3 = decrypt.p;
        decrypt.s = iArr3[0];
        iArr3[0] = iArr3[1];
        iArr3[1] = decrypt.s;
        decrypt.m = (BigInt(iArr3[1]) << BigInt(32)) | BigInt(JSAbstractArray.MAX_JS_ARRAY_LENGTH & iArr3[0]);
        decrypt.m = decrypt.aFunc1(decrypt.h, 64, decrypt.m);
        return decrypt.m;
    },

    // Another encryption method
    bFunc2: function b(bArr, bArr2) {
        const length = bArr.length;
        const jArr = new Array(16).fill(BigInt(0));
        let j3 = BigInt(0);
        for (let i3 = 0; i3 < 8; i3++) {
            j3 |= BigInt(bArr2[i3]) << BigInt(i3 * 8);
        }
        decrypt.aFunc2(j3, jArr, 0);
        const i4 = Math.floor(length / 8);
        const jArr2 = new Array(i4).fill(BigInt(0));
        for (let i5 = 0; i5 < i4; i5++) {
            for (let i6 = 0; i6 < 8; i6++) {
                jArr2[i5] |= BigInt(bArr[(i5 * 8) + i6] & 255) << BigInt(i6 * 8);
            }
        }
        const jArr3 = new Array(Math.floor(((i4 + 1) * 8 + 1) / 8)).fill(BigInt(0));
        for (let i7 = 0; i7 < i4; i7++) {
            jArr3[i7] = decrypt.aFunc4(jArr, jArr2[i7]);
        }
        const i8 = length % 8;
        let j2 = BigInt(0);
        if (i8 > 0) {
            const i9 = i4 * 8;
            const r12 = bArr.slice(i9, i9 + i8);
            for (let i11 = 0; i11 < i8; i11++) {
                j2 |= BigInt(r12[i11] & 255) << BigInt(i11 * 8);
            }
            jArr3[i4] = decrypt.aFunc4(jArr, j2);
        }
        const bArr3 = new Uint8Array(jArr3.length * 8);
        let i13 = 0;
        for (let i12 = 0; i12 < jArr3.length; i12++) {
            for (let i15 = 0; i15 < 8; i15++) {
                bArr3[i13] = Number(BigInt(255) & (jArr3[i12] >> BigInt(i15 * 8)));
                i13++;
            }
        }
        return bArr3;
    },

    // Main encryption method
    aFunc: function a(bArr, i2, bArr2) {
        let j2 = BigInt(0);
        for (let i4 = 0; i4 < 8; i4++) {
            j2 |= BigInt(bArr2[i4]) << BigInt(i4 * 8);
        }
        const i5 = Math.floor(i2 / 8);
        const jArr = new Array(16).fill(BigInt(0));
        const jArr2 = new Array(i5).fill(BigInt(0));
        for (let i7 = 0; i7 < i5; i7++) {
            for (let i8 = 0; i8 < 8; i8++) {
                jArr2[i7] |= BigInt(bArr[(i7 * 8) + i8]) << BigInt(i8 * 8);
            }
        }
        const jArr3 = new Array(Math.floor(((i5 + 1) * 8 + 1) / 8)).fill(BigInt(0));
        decrypt.aFunc2(j2, jArr, 0);
        for (let i9 = 0; i9 < i5; i9++) {
            jArr3[i9] = decrypt.aFunc4(jArr, jArr2[i9]);
        }
        const i10 = i2 % 8;
        if (i10 > 0) {
            const i11 = i5 * 8;
            const r9 = bArr.slice(i11, i11 + i10);
            let j3 = BigInt(0);
            for (let i13 = 0; i13 < i10; i13++) {
                j3 |= BigInt(r9[i13]) << BigInt(i13 * 8);
            }
            jArr3[i5] = decrypt.aFunc4(jArr, j3);
        }
        const bArr3 = new Uint8Array(jArr3.length * 8);
        let i15 = 0;
        for (let i14 = 0; i14 < jArr3.length; i14++) {
            for (let i17 = 0; i17 < 8; i17++) {
                bArr3[i15] = Number(BigInt(255) & (jArr3[i14] >> BigInt(i17 * 8)));
                i15++;
            }
        }
        return bArr3;
    },

    // Main decryption method
    aFunc5: function a(bArr, bArr2) {
        const length = bArr.length;
        const jArr = new Array(16).fill(BigInt(0));
        let j2 = BigInt(0);
        for (let i2 = 0; i2 < 8; i2++) {
            j2 |= BigInt(bArr2[i2]) << BigInt(i2 * 8);
        }
        decrypt.aFunc2(j2, jArr, 1);
        const i4 = Math.floor(length / 8);
        const jArr2 = new Array(i4).fill(BigInt(0));
        for (let i5 = 0; i5 < i4; i5++) {
            for (let i6 = 0; i6 < 8; i6++) {
                jArr2[i5] |= BigInt(bArr[(i5 * 8) + i6] & 255) << BigInt(i6 * 8);
            }
        }
        const jArr3 = new Array(i4);
        for (let i7 = 0; i7 < i4; i7++) {
            jArr3[i7] = decrypt.aFunc4(jArr, jArr2[i7]);
        }
        const bArr3 = new Uint8Array(i4 * 8);
        for (let i8 = 0; i8 < i4; i8++) {
            for (let i9 = 0; i9 < 8; i9++) {
                bArr3[(i8 * 8) + i9] = Number(BigInt(255) & (jArr3[i8] >> BigInt(i9 * 8)));
            }
        }
        return bArr3;
    },
};

let $ = new Env('酷我纯净版')
let url = $request.url
if (url.indexOf('/user/vip') !== -1) {
    let body = $response.body
    let data = JSON.parse(body)
    let json = data.data
    json.isNewUser = '1'
    json.vipOverSeasExpire = '1767139200000'
    json.isYearUser = '1'
    json.vipExpire = '1767139200000'
    json.vip3Expire = '1767139200000'
    json.biedAlbum = '1767139200000'
    json.vipmAutoPayUser = '1767139200000'
    json.vipmExpire = '1767139200000'
    json.vipLuxuryExpire = '1767139200000'
    json.luxAutoPayUser = '1'
    json.vipWatch1Expire = '1767139200000'
    json.vipAdExpire = '1767139200000'
    json.svipAutoPayUser = '1'
    json.svipExpire = '1767139200000'
    json.biedSong = '1767139200000'
    json.vipAdAutoPayUser = '1'
    json.experienceExpire = '1767139200000'
    data.data = json
    $.done({body: JSON.stringify(data)})
}
if (url.indexOf('/mobi.s') !== -1) {
    const request = new URL(url);
    $.log(request)
    let q = request.searchParams.get('q');
    if (!q) {
        $.error("未获取到 q 参数");
    } else {
        // 把 URL 中被替换成空格的 + 还原
        q = q.replace(/ /g, '+');
        q = decodeURIComponent(q);
        $.log("q 参数:", q);
    }
    $.log(q)
    const encryptedData = base64ToUint8Array(q);
    const key = new Uint8Array([121, 108, 122, 115, 120, 107, 119, 109]); // "kwks&@69".getBytes()
    let decryptedString;
    try {
        const decryptedData = decrypt.aFunc5(encryptedData, key);
        // 将解密后的字节数组转换为字符串（如果内容是文本）
        const textDecoder = new TextDecoder('utf-8');
        decryptedString = textDecoder.decode(decryptedData);
        decryptedString = decryptedString.replace(/\u0000+$/g, '');
        $.log('解密后的数据:', decryptedString);
    } catch (error) {
        $.error('解密过程中出错:', error);
    }
    const params = new URLSearchParams(decryptedString);
    $.log('解密后的参数',params.toString())
    params.set('source', 'kwplayercar_ar_6.0.0.9_B_jiakong_vh.apk');
    params.set('user', 'C_APK_guanwang_12609069939969033731');
    $.log('替换的参数',params.toString())
    const encryptedNewData = decrypt.bFunc2(new TextEncoder().encode(encodeURIComponent(params.toString())), key);
    const newQ = uint8ArrayToBase64(encryptedNewData);
    $.log('新的 q',newQ)
    request.searchParams.set('q', newQ);
    const newUrl = request.toString();
    $.log('新的 URL:', decodeURIComponent(newUrl));
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


// base64 解码成 Uint8Array
function base64ToUint8Array(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

// Uint8Array 编码为 base64
function uint8ArrayToBase64(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}