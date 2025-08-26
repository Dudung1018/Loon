// main.ts — Deno Deploy 的入口，实现静态 JS 文件托管
export default {
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const filename = url.pathname.slice(1) || "index.js"; // 默认 fallback 文件

    try {
      const content = await Deno.readTextFile(filename);
      return new Response(content, {
        headers: {
          "content-type": maybeJs(filename),
          "cache-control": "no-store",
        },
      });
    } catch (e) {
      return new Response(`File "${filename}" not found.\n`, { status: 404 });
    }
  },
};

// 根据文件后缀自动设置 Content-Type
function maybeJs(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase();
  return ext === "js" ? "application/javascript; charset=utf-8" : "application/octet-stream";
}
