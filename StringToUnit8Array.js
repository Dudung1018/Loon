async function getFinalKey() {
    const suffix = "5589d41f92a597d016b037ac37db243d";
    const encoder = new TextEncoder();

    const combined = 'client=pwa&data=yL0eQkVKbEJ0SzT833Merw3iuRTW4jIRpsz8LOnjBToNEC4y2zZvjovANgnrqcpJWb2gliXOUcW0sARg0lP2Q8ETaHBoH/fUiJoZs7JzQwhMBWOF1v fDO8It5rY0XDRtgT6FriAq8es86vPxbdsejqBYEnf/lIn DMQ2x38fcMgEuDvKmyN6w10nzhqXyVuxAWxy8soTylNReJLBDASiQ==&timestamp=1754556722'+ suffix;
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