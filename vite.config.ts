import { dirname, relative } from "path";
import { defineConfig, UserConfig } from "vite";

import Vue from "@vitejs/plugin-vue";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

import UnoCSS from "unocss/vite";

import { r, port, isDev } from "./scripts/utils";

import { FileSystemIconLoader } from "unplugin-icons/loaders";

export const sharedConfig: UserConfig = {
    root: r("src"),
    resolve: {
        alias: {
            "~/": `${r("src")}/`,
        },
    },
    define: {
        __DEV__: isDev,
    },
    plugins: [
        Vue(),

        AutoImport({
            imports: [
                "vue",
                {
                    "webextension-polyfill": [["*", "browser"]],
                },
            ],
            dts: r("src/auto-imports.d.ts"),
        }),

        // https://github.com/antfu/unplugin-vue-components
        Components({
            dirs: [r("src/components")],
            // generate `components.d.ts` for ts support with Volar
            dts: true,
            resolvers: [
                // auto import icons
                IconsResolver({
                    componentPrefix: "",
                }),
            ],
        }),

        // https://github.com/antfu/unplugin-icons
        Icons({
            customCollections: {
                logos: FileSystemIconLoader("./extension/assets"),
            },
        }),

        // https://github.com/unocss/unocss
        UnoCSS(),

        // rewrite assets to use relative path
        {
            name: "assets-rewrite",
            enforce: "post",
            apply: "build",
            transformIndexHtml(html, { path }) {
                return html.replace(/"\/assets\//g, `"${relative(dirname(path), "/assets")}/`);
            },
        },
    ],
    optimizeDeps: {
        include: ["vue", "@vueuse/core", "webextension-polyfill"],
        exclude: ["vue-demi"],
    },
};

export default defineConfig(({ command }) => ({
    ...sharedConfig,
    base: command === "serve" ? `http://localhost:${port}/` : "/dist/",
    server: {
        port,
        hmr: {
            host: "localhost",
        },
    },
    build: {
        outDir: r("extension/dist"),
        emptyOutDir: false,
        sourcemap: isDev ? "inline" : false,
        minify: "esbuild",
        rollupOptions: {
            input: {
                background: r("src/background/index.html"),
                options: r("src/options/index.html"),
                popup: r("src/popup/index.html"),
            },
        },
    },
    plugins: sharedConfig.plugins,
}));
