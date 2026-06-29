import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)), "dist");
const port = Number(process.env.PORT || 5173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function resolvePath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const clean = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const requested = join(root, clean);
  if (existsSync(requested) && statSync(requested).isFile()) return requested;
  return join(root, "index.html");
}

createServer((request, response) => {
  const file = resolvePath(request.url || "/");
  response.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
  createReadStream(file).pipe(response);
}).listen(port, "0.0.0.0", () => {
  console.log(`Aitabi preview: http://127.0.0.1:${port}/`);
});
