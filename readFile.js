/*
#!name=iCloud文件上传至GitHub (一体化)
#!desc=从iCloud Drive读取文件，并将其内容上传到GitHub，无需其他文件。
#!openUrl =
#!icon = https://raw.githubusercontent.com/fishdown/Icon/master/app/folder.png
#!author=fishdown
#!date=2025-09-08

[Argument]
filePath = input, "", tag=iCloud文件路径, desc=输入你要读取的iCloud文件路径
owner = input, "", tag=git用户名, desc=GitHub 用户名
repo = input, "", tag=git仓库名, desc=GitHub 仓库名
branch = input, "", tag=git分支, desc=GitHub 分支
path = input, "", tag=文件路径, desc=文件在仓库中的路径
ghToken = input, "", tag=gitoken, desc=GitHub Token

open = switch, false, tag=开关, desc=
cron = input, "35 * * * *", tag=Cron时间, desc=cron表达式

[Script]
cron {cron} script-path=icloud-upload-full.js, timeout=60, img-url=https://raw.githubusercontent.com/fishdown/Icon/master/app/folder.png, enable={open}, tag=iCloud文件上传, argument=[{filePath},{owner},{repo},{branch},{path},{ghToken}]
*/

let { filePath, owner, repo, branch, path, ghToken } = $argument;
const startTime = Date.now();

// ========== 主入口 ==========
async function main() {
    console.log("📦 脚本启动，准备从iCloud读取文件...");

    const uploadArgs = { filePath, owner, repo, branch, path, ghToken };
    if (!validateArguments(uploadArgs)) return $done();

    try {
        // ⚠️ 请注意：这里需要替换为Loon实际支持的iCloud文件读取API。
        const fileContent = await readICloudFile(filePath);
        console.log(`✅ 文件读取成功，内容长度: ${fileContent.length}`);

        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        const headers = {
            Authorization: `token ${ghToken}`,
            "Content-Type": "application/json",
            "User-Agent": "Loon-GitHub-Uploader",
        };

        const fileData = await getFile(apiUrl, headers, branch);
        if (fileData) {
            console.log("📄 文件已存在，准备更新");
            await updateFile(apiUrl, headers, fileContent, branch, fileData.sha);
            notifySuccess(fileData.download_url, "更新");
        } else {
            console.log("📝 文件不存在，准备创建");
            await createFile(apiUrl, headers, fileContent, branch);
            const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
            notifySuccess(rawUrl, "创建");
        }
    } catch (error) {
        handleError(error);
    } finally {
        $done();
    }
}

// ========== 参数验证 ==========
function validateArguments(args) {
    if (!args.filePath || !args.owner || !args.repo || !args.path || !args.branch || !args.ghToken) {
        const errorMsg = "❌ 缺少关键参数，请检查是否填写完整。";
        console.log(errorMsg);
        $notification.post("iCloud文件上传GitHub", "❌ 上传失败", errorMsg);
        return false;
    }
    return true;
}

// ========== 文件读取函数 (需要根据Loon API进行修改) ==========
function readICloudFile(path) {
    return new Promise((resolve, reject) => {
        // 由于我无法直接访问Loon的iCloud API，这里用一个模拟函数代替
        // 您需要将此部分替换为Loon实际支持的API调用
        // 例如，如果Loon有类似$file.read('/path/to/file')的API，请在此处替换
        if (path.includes('valid_path_in_icloud')) {
            resolve("这是从iCloud文件读取到的内容。\n可以包含多行文本和特殊字符。");
        } else {
            reject(new Error("文件路径无效或文件不存在。请检查Loon是否拥有访问iCloud的权限。"));
        }
    });
}

// ========== GitHub API 交互函数（与之前版本相同） ==========
function getFile(apiUrl, headers, branch) {
    return new Promise((resolve, reject) => {
        $httpClient.get({ url: `${apiUrl}?ref=${branch}`, headers }, (err, resp, data) => {
            if (err) return reject(new Error(`网络错误: ${err}`));
            if (resp.status === 404) return resolve(null);
            if (resp.status !== 200) {
                return reject(new Error(`获取文件信息失败: ${resp.status} - ${data}`));
            }
            try {
                const res = JSON.parse(data);
                resolve(res);
            } catch (e) {
                reject(new Error("响应解析失败: " + data));
            }
        });
    });
}

function createFile(apiUrl, headers, content, branch) {
    return new Promise((resolve, reject) => {
        const body = {
            message: `feat: 上传iCloud文件 ${new Date().toLocaleString("zh-CN", { hour12: false })}`,
            content: base64Encode(content),
            branch: branch,
        };
        $httpClient.put({ url: apiUrl, headers, body: JSON.stringify(body) }, (err, resp, data) => {
            if (err) return reject(new Error(`网络错误: ${err}`));
            if (resp.status !== 201) return reject(new Error(`创建文件失败: ${resp.status} - ${data}`));
            resolve();
        });
    });
}

function updateFile(apiUrl, headers, content, branch, sha) {
    return new Promise((resolve, reject) => {
        const body = {
            message: `chore: 更新iCloud文件 ${new Date().toLocaleString("zh-CN", { hour12: false })}`,
            content: base64Encode(content),
            branch: branch,
            sha: sha,
        };
        $httpClient.put({ url: apiUrl, headers, body: JSON.stringify(body) }, (err, resp, data) => {
            if (err) return reject(new Error(`网络错误: ${err}`));
            if (resp.status !== 200) return reject(new Error(`更新文件失败: ${resp.status} - ${data}`));
            resolve();
        });
    });
}

// ========== 错误处理和通知函数 ==========
function handleError(error) {
    const errorMsg = typeof error === 'string' ? error : error.message || "未知错误";
    console.log(`❌ ${errorMsg}`);
    $notification.post("iCloud文件上传GitHub", "❌ 上传失败", errorMsg);
}

function notifySuccess(downloadUrl, action) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const rawUrl = downloadUrl.replace("https://github.com/", "https://raw.githubusercontent.com/").replace("/blob/", "/");
    const attach = { openUrl: rawUrl, clipboard: rawUrl };
    const title = `✅ ${action}成功 | 耗时 ${duration}s`;
    console.log(`✅ ${title}`);
    $notification.post("iCloud文件上传GitHub", title, rawUrl, attach);
}

// ========== Base64 编码函数 ==========
function base64Encode(str) {
    try {
        return Buffer.from(str, "utf-8").toString("base64");
    } catch (e) {
        return btoa(unescape(encodeURIComponent(str)));
    }
}

// ========== 执行主函数 ==========
main();