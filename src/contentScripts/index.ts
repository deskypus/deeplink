/* eslint-disable no-console */
import { onMessage } from "webext-bridge";
import { createApp } from "vue";
import App from "./views/App.vue";

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
    console.info("[pulumi-consolepus] content script loaded");

    onMessage("tab-loaded", () => {
        // mount component to context window
        const container = document.createElement("div");
        const root = document.createElement("div");

        const styleEl = document.createElement("link");
        styleEl.setAttribute("rel", "stylesheet");
        styleEl.setAttribute("href", browser.runtime.getURL("dist/contentScripts/style.css"));

        const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? "open" : "closed" }) || container;
        shadowDOM.appendChild(styleEl);
        shadowDOM.appendChild(root);

        document.body.appendChild(container);

        const projectContainers = document.querySelectorAll(".project-container");
        createApp(App, { projectContainers }).mount(root);
    });
})();
