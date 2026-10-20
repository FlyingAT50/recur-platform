import { readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";

const root = new URL("./dist/", import.meta.url).pathname;
const files = ["index.html", "manifest.json", "favicon.svg", "icon-192.png", "icon-512.png"];

for (const file of files) await stat(join(root, file));

const sources = ["index.html"];
const assets = new Set();
for (const source of sources) {
  const text = await readFile(join(root, source), "utf8");
  for (const match of text.matchAll(/(?:src|href)="\/([^"#?]+)"/g)) assets.add(match[1]);
}

for (const asset of assets) {
  if ([".js", ".css", ".png", ".jpg", ".svg", ".json"].includes(extname(asset))) {
    await stat(join(root, asset));
  }
}

console.log(`Recur snapshot check passed (${assets.size} root references).`);

