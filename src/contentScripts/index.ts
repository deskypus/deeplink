/* eslint-disable no-console */
import { onMessage } from "webext-bridge/content-script";
import Cookies from "js-cookie";
import { createApp } from "vue";
import OpenProjectButton from "./views/OpenProjectButton.vue";

interface OrganizationInfo {
    name: string;
    githubLogin: string;
    avatarUrl: string;
}

interface PulumiUserInfo extends OrganizationInfo {
    email: string;
    organizations: OrganizationInfo[];
    identities: string[];
}

function process(userInfo: PulumiUserInfo) {
    const projectContainers = document.querySelectorAll(".project-container");
    const length = projectContainers?.length || 0;

    for (let i = 0; i < length; i++) {
        const projectContainer = projectContainers?.item(i);
        if (!projectContainer) {
            continue;
        }

        const projectRepoAnchorElements = projectContainer.querySelectorAll(
            "app-project-group .pul-link.external-link"
        );
        // There should be only one anchor (<a>) tag in the `app-project-group` element.
        if (!projectRepoAnchorElements || !projectRepoAnchorElements.length) {
            return;
        }

        const repoUrl = projectRepoAnchorElements.item(0).getAttribute("href");
        if (!repoUrl) {
            continue;
        }

        const projGroupNameEl = projectContainer.querySelector("app-project-group .proj-group-name");
        const projectNameElements = projectContainer.querySelectorAll(
            ".project-container-inner .projects app-project-card .project-card .mat-mdc-card-content app-project-header .project-label .proj-project-name"
        );

        projectNameElements.forEach((p: Element) => {
            if (p.querySelector(".pul-desk")) {
                return;
            }

            p.classList.add("proj-project-name-flex");

            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("pul-desk");
            p.appendChild(buttonContainer);

            const projectName = p.textContent;
            const projGroupName = projGroupNameEl?.textContent || "";
            createApp(OpenProjectButton, {
                accountName: userInfo.githubLogin,
                href: repoUrl,
                projGroupName,
                projectName,
            }).mount(buttonContainer);
        });
    }
}

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
    console.info("[pulumi-console-extension] content script loaded");

    onMessage("tab-loaded", (_data) => {
        const pulumiUserInfoCookie = Cookies.get("pulumi_user_info");
        if (!pulumiUserInfoCookie) {
            console.log("No Pulumi user info cookie found. Skipping...");
            return;
        }
        const pulumiUserInfo = JSON.parse(pulumiUserInfoCookie.replace("j:", "")) as PulumiUserInfo;

        const styleEl = document.createElement("link");
        styleEl.setAttribute("rel", "stylesheet");
        styleEl.setAttribute("href", browser.runtime.getURL("dist/contentScripts/style.css"));

        document.body.appendChild(styleEl);

        // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? "open" : "closed" }) || container;
        // shadowDOM.appendChild(styleEl);
        // shadowDOM.appendChild(root);
        setTimeout(() => process(pulumiUserInfo), 1000);

        const projects = document.querySelector("app-projects-card");
        if (!projects) {
            return;
        }

        let timeout: NodeJS.Timeout;
        const observer = new MutationObserver(() => {
            // Clear the previously scheduled timeout since the
            // mutation have triggered again.
            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => {
                process(pulumiUserInfo);
            }, 800);
        });
        observer.observe(projects, {
            childList: true,
        });
    });
})();
