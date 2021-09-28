/* eslint-disable no-console */
import { onMessage } from "webext-bridge";
import { createApp } from "vue";
// import App from "./views/App.vue";
import OpenProjectButton from "./views/OpenProjectButton.vue";

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
    console.info("[pulumi-consolepus] content script loaded");

    onMessage("tab-loaded", () => {
        // mount component to context window
        // const container = document.createElement("div");
        // const root = document.createElement("div");

        const styleEl = document.createElement("link");
        styleEl.setAttribute("rel", "stylesheet");
        styleEl.setAttribute("href", browser.runtime.getURL("dist/contentScripts/style.css"));

        // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? "open" : "closed" }) || container;
        // shadowDOM.appendChild(styleEl);
        // shadowDOM.appendChild(root);

        document.body.appendChild(styleEl);

        const projectContainers = document.querySelectorAll(".project-container");
        const length = projectContainers?.length || 0;

        for (let i = 0; i < length; i++) {
            const projectContainer = projectContainers?.item(i);
            if (!projectContainer) {
                continue;
            }

            const projectRepoAnchorEl = projectContainer.querySelectorAll("app-project-group .pul-link.external-link");
            // There should be only one anchor (<a>) tag in the `app-project-group` element.
            const repoUrl = projectRepoAnchorEl.item(0).getAttribute("href");
            if (!repoUrl) {
                continue;
            }

            const projGroupName = projectContainer.querySelector("app-project-group .proj-group-name");
            const buttonContainer = document.createElement("div");
            buttonContainer.style.display = "inline-block";
            projGroupName?.parentElement?.append(buttonContainer);
            createApp(OpenProjectButton, { href: repoUrl }).mount(buttonContainer);

            const projectNameEl = projectContainer.querySelectorAll(
                ".project-container-inner .projects app-project-card .project-card .mat-card-content app-project-header .project-label .proj-project-name"
            );

            const projectNames: string[] = [];
            projectNameEl.forEach((p) => projectNames.push(p.textContent!));
            console.log("project names", projectNames);
        }
    });
})();
