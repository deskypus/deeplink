import fs from "fs-extra";

import type { Manifest } from "webextension-polyfill";

import type PkgType from "../package.json";

import { isDev, port, r, log } from "../scripts/utils";

export async function getManifest() {
    const pkg = (await fs.readJSON(r("package.json"))) as typeof PkgType;

    // update this file to update this manifest.json
    // can also be conditional based on your need
    const manifest: Manifest.WebExtensionManifest = {
        manifest_version: 3,
        name: pkg.displayName || pkg.name,
        version: pkg.version,
        description: pkg.description,
        action: {
            default_icon: "./assets/icon_128@2x.png",
            default_popup: "./dist/popup/index.html",
        },
        icons: {
            16: "./assets/icon_16@2x.png",
            48: "./assets/icon_48@2x.png",
            128: "./assets/icon_128@2x.png",
        },
        permissions: ["tabs", "activeTab"],
        host_permissions: ["https://app.pulumi.com/*"],
        content_scripts: [
            {
                matches: ["https://app.pulumi.com/*"],
                js: ["./dist/contentScripts/index.global.js"],
            },
        ],
        content_security_policy: {
            extension_pages: isDev
                ? // this is required on dev for Vite script to load
                  `script-src 'self' http://localhost:${port}; object-src 'self' http://localhost:${port}`
                : "script-src 'self'; object-src 'self'",
        },
        web_accessible_resources: [
            {
                resources: ["dist/contentScripts/style.css"],
                matches: ["https://app.pulumi.com/*"],
            },
        ],
    };

    if (isDev) {
        // for content script, as browsers will cache them for each reload,
        // we use a background script to always inject the latest version
        // see src/background/contentScriptHMR.ts
        delete manifest.content_scripts;
        manifest.permissions?.push("webNavigation");

        // this is required on dev for Vite script to load
        manifest.content_security_policy = `script-src 'self' http://localhost:${port}; object-src 'self'`;
    }

    const buildForFirefox = process.env.BUILD_FOR_FIREFOX === "true" ? true : false;

    if (buildForFirefox) {
        log("MANIFEST", "Building manifest for Firefox");
        // Firefox does not support service workers for background scripts in Manifest V3.
        // Instead, they support (only) non-persistent background scripts from V3 onwards.
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts#specify_the_background_scripts
        manifest.background = {
            scripts: ["./dist/background/index.js"],
            type: "module",
        };
        manifest.browser_specific_settings = {
            gecko: {
                // The add-on ID is required for add-ons using manifest V3.
                // https://extensionworkshop.com/documentation/develop/extensions-and-the-add-on-id/
                // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings
                id: "{7b5273e7-7c08-460f-a32b-4b2fa62514a0}",
                // 109 is the minimum version for Manifest V3 in Firefox.
                // https://extensionworkshop.com/documentation/publish/distribute-manifest-versions/
                strict_min_version: "109.0",
            },
        };
    } else {
        log("MANIFEST", "Building manifest for Chrome");
        // Chrome only supports service workers starting in V3.
        manifest.background = {
            service_worker: "./dist/background/index.js",
        };
    }

    return manifest;
}
