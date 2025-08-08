async function getFinalKey() {
    const suffix = "5589d41f92a597d016b037ac37db243d";
    const encoder = new TextEncoder();

    const combined = 'client=pwa&data=FTJExw+JBRqDFJ/fWXhXOhYSX4ypoiHK+7A5fZnXILJnzm1gWPmNH82kE6o3XmzqIP/054MHTiAl2+wud+e5cWVVX0tik340tyqspE9pAwn3pESu/bzojWIT1kdfpgdRknH496l0eC1CoomazJ0dZTPg0RzhxVPulCcxlU1KsnldXh2QKbep4pijdRlr7ie7x56SpSL+R+AanyWqRgaOkQ==&timestamp=1754572196' + suffix;
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