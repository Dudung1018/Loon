async function getFinalKey() {
    const suffix = "5589d41f92a597d016b037ac37db243d";
    const combined = 'client=pwa&data=nMBxnto3ixuS4qY4DuP+DPj/M3ZVqkpoXgZU/OLbPWPtRs7Ei60Sd2kOQhtSnVpq+pm1tAlQsFFRttn9dk9+P2/NSVsn8Nf/c7g84f1+ECfv0u9rZYnuzGCBeuo0GpKKW5m4kqcqkca5+lK+lERHi6hMz2FKdxPM9uskS1f66Dyv+J6JTpYyz1UFT6OQMKbMD1ya+VYzEdCygTfnOzCZUQ==&timestamp=1754441161' + suffix;

    const encoder = new TextEncoder();
    const data = encoder.encode(combined);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return new Uint8Array(hashBuffer); // Uint8Array(32)
}

const result = await getFinalKey();
function uint8ArrayToHexString(a) {
    const hexChars = "0123456789abcdef";
    const result = [];

    for (let i = 0; i < a.length; i++) {
        const byte = a[i];
        result.push(hexChars[(byte >> 4) & 0x0f]);
        result.push(hexChars[byte & 0x0f]);
    }

    return result.join('');
}
const input = Uint8Array.from([
    244, 156, 251,  96,  42,
    147,  24, 175, 162, 192,
    180, 192, 130,  24, 224,
    166
]);
console.log(uint8ArrayToHexString(result))