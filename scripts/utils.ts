import { resolve } from "path";
import { bgCyan, black } from "kolorist";

import { fileURLToPath, URL } from "url";

console.log("import meta", import.meta);

const dirname = fileURLToPath(new URL("..", import.meta.url));

export const port = parseInt(process.env.PORT || "") || 3303;
export const r = (...args: string[]) => resolve(dirname, ...args);
export const isDev = process.env.NODE_ENV !== "production";

export function log(name: string, message: string) {
    // eslint-disable-next-line no-console
    console.log(black(bgCyan(` ${name} `)), message);
}
