/****************
 #!name=酷我纯净版
 #!desc=修改 vip
 #!author=Lonely-Lifer
 #!date=2025-08-23

 [Script]
 http-response ^https?://vip1\.kuwo\.cn/vip/enc/user/vip\?(?=.*\buid=(\d+))(?=.*\bsid=(\d+))(?=.*\bdevid=(\d+)).*$ script-path=https://loon.dudung.cloudns.org/kw.js, requires-body=true, timeout=60, tag=会员
 http-request ^https?://musicpay\.kuwo\.cn/music\.pay\?newver=\d+$ script-path=https://loon.dudung.cloudns.org/kw.js, requires-body=true, timeout=60, tag=播放1
 http-response ^https:\/\/anymatch\.kuwo\.cn\/mobi\.s\?f=kwxs&q=.* script-path=https://loon.dudung.cloudns.org/kw.js, requires-body=true, timeout=60, tag=播放2

 [MITM]
 hostname = *.kuwo.cn
 ****************/

let $ = new Env('酷我标准版')
let url = $request.url
const method = $request.method
const type = $script.type
let body;
if(type === 'http-request') body = $request.body
else body = $response.body
if (url.indexOf('/user/vip') !== -1) {
    $.done({body: 'Vo4m6X2hTph/vfpPmau8PTT0sFN6JCgzxSLVH/u3sbEt7VniYsVHbRFgOgN+Uvs39rAI7R3C5HVpaSj8tr8U8dLYwYdDCjMILuUorh3z0BiQToiWxudHkcASIPHNrmZHZYC/yv3DP4b89hbzfqU5UUDUqaZpEBZr76sDF2wNPmYjUEFSVCMGyTl1F6j1DBmKJ1Tik0YuG/2UBa/Ilz12a1KneXsNs5x5EE41bXDke7EygIB3I+6SoITZXOLFAFQFZujdI0GzClNglDKtclpUxpjN3uVeJxHLU40FTwNWo3ZDNv8KSdZpYZ5BDEOCyZkifmHlf1wnocX2zTr2xRAM6JhAD2WaSSNQQVJUI5lv72QNZSN43Pj/qdzatHQP4Pp/H1YxyP36rv3qBcnnJy/55YouIczRc3eJjXExRgo54qdyTYRMYoS9GzNn/edR3hSNnMn9PnElBCfZhkL0R5kZ9JBFCM3vNOy7Cnp6RVyAG0GFHv/g2q1yqkJxibyDro5nlnnvHjhZrsOvSvTXI1BBUlQjGoRqqCTDUvHLoiNwWMoKKfxtswWQiXjoQ6mL5dazxjUsbsHzC1N8YNMVtzf8gBryr3nMWS44wyUpi1/0WhGTRW1wsCllO1DB24+ibTFH/yftWN+/apM9vbQAkc/J+aFy/01plK7rsGNwWYYKG0sr6CS8dGQzy0On6aFo07hiU+wjUEFSVCOf/wKzzX5Cn/OLMKeVa1BPDxV5tm39vCrsxIG6T29VHWx8ck93S/nXCm2dHfojuLySZKJ50B1FaN5uFIY+LA1RbO/0sL+CoSJhoNOLibzt75c5dleW+lbwxLAAdBh5AFq4Z1Uj8bPjm5mHcGWQuBAyZIO+ie8wP4yvWwQFf1ENJiNQQVJUIzwCo22cpAtoAzYZWm3XFPfSlov4G15JGaaHL2X5FG5BTeUwwbBiQfwUpcb6oT8dbIKh2SsUZCeJZW43lLI0UIo9u3y1+P4GMtOKEZ7Sx0aQ3ewknthU2tpL0gnykFtiEtKBxcfHjJEen158zVXrbxxC0W35SmaYOOwgAmEMfxwHI1BBUlQjhVUHnBabnJcnmXCICcyUBglrZkXcNLwg91p4889vKFTLlzROHTt20UzjfKWsNK3U8pYgKYXPbQtSzIuRheEEQDFhLvEhIGKaB6yDoacDLJZ0jgFRIKKFBkbK0VE4nIABi1qgQOXvq1sG4QeupjfEWYqMX8EyyqPHrsDiCltAF1wjUEFSVCNybeUusnxJF2zswj8xQtfPiwfDj3TwKWxKXCmkheqHy7/0Qpyc84xWvq+YXktsU97wUZLHrgJmARudJmQNEwAweIdHMafcwreBy731z6kGLojy5TLgTN7XSm5Ar+hgOW+1ZwkWLyrVvaCdO/8/zdYl1w/PQUCs6dw0ThIeahwjpQ=='});
}
if (url.includes("/music.pay") && method == "POST") {
    const quality = new URLSearchParams(body).get('quality')
    const headers = $request.headers
    $httpClient.post({url:url,headers:headers,body:body},(error, response, data) => {
        if (error) {
            console.log("请求错误: " + error);
            $done({error: error});
        }
        if (data.includes("audio")) {
            let obj = JSON.parse(data);
            obj.songs[0].audio.forEach((item) => (item.st = 0))
            let br = obj.songs[0].audio.find(item => item.quality === quality).br
            if(br===20000) br =br+'mflac'
            else br = br +'kmp3'
            $persistentStore.write(obj.songs[0].id, "rid");
            $persistentStore.write(br,"br")
            let tmp = obj.songs[0].audio[0].policy
            obj.user[0] = {
                pid: obj.songs[0].audio[0].pid,
                type: tmp,
                name: tmp + "_1",
                categray: tmp + "_1",
                id: obj.songs[0].id,
                order: 375787919,
                final: [],
                buy: 1657425321,
                begin: 1657425321,
                end: 4180305321,
                CurEnd: 0,
                playCnt: 0,
                playUpper: 300,
                downCnt: 0,
                downUpper: 300,
                playVideoCnt: 0,
                playVideoUpper: 3000,
                downVideoCnt: 0,
                downVideoUpper: 3000,
                price: obj.songs[0].audio[0].price,
                period: 1000,
                feetype: 0,
                info: obj.songs[0]
            }
            body = JSON.stringify(obj)
            $.done({body:body})
        }
    })

}
if (url.indexOf('/mobi.s') !== -1) {
    const rid = $persistentStore.read("rid")
    const br = $persistentStore.read("br")
    const url = `https://mobi.kuwo.cn/mobi.s?f=web&source=kwplayercar_ar_6.0.0.9_B_jiakong_vh.apk&from=PC&type=convert_url_with_sign&br=${br}&rid=${rid}&&user=C_APK_guanwang_12609069939969033731`
    fetch(url)
        .then(res => res.json())   // 解析成 JSON
        .then(data => {
            console.log(data)
            $.done({body: JSON.stringify(data)})
        })
        .catch(err => console.error("请求出错:", err));
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
