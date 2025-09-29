/****************
 #!name=酷我纯净版
 #!desc=修改 vip
 #!author=Lonely-Lifer
 #!date=2025-08-23

 [Script]
 http-response ^https?://vip1\.kuwo\.cn/vip/enc/user/vip\?(?=.*\buid=(\d+))(?=.*\bsid=(\d+))(?=.*\bdevid=(\d+)).*$ script-path=https://loon.dudung.cloudns.org/kw.js, requires-body=true, timeout=60, tag=会员
 http-response ^https?:\/\/(?:www\.)?musicpay\.kuwo\.cn\/music\.pay(?:\/)?(?:\?.*)?$ script-path=https://loon.dudung.cloudns.org/kw.js, requires-body=true, timeout=60, tag=播放

 [MITM]
 hostname = *.kuwo.cn
 ****************/

let $ = new Env('酷我标准版')
let url = $request.url
if (url.indexOf('/user/vip') !== -1) {
    $.done({body: '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'});
}
if (url.indexOf('/music.pay') !== -1) {
    const body = $response.body;
    const rid = JSON.parse(body).songs[0].mp3rid
    const url = `https://mobi.kuwo.cn/mobi.s?f=web&source=kwplayercar_ar_6.0.0.9_B_jiakong_vh.apk&from=PC&type=convert_url_with_sign&br=128kmp3&rid=${rid}&&user=C_APK_guanwang_12609069939969033731`
    fetch(url)
        .then(res => res.json())   // 解析成 JSON
        .then(data => {
            $.done({body: JSON.stringify(data.data)})
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
