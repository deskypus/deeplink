import { sendMessage, onMessage } from "webext-bridge";
import { Tabs } from "webextension-polyfill";

// only on dev mode
if (import.meta.hot) {
    // @ts-expect-error for background HMR
    import("/@vite/client");
    // load latest content script
    import("./contentScriptHMR");
}

browser.runtime.onInstalled.addListener((): void => {
    // eslint-disable-next-line no-console
    console.log("Extension installed");
});

let previousTabId = 0;
// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {
    previousTabId = tabId;
});

browser.tabs.onUpdated.addListener((tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => {
    if (tab.status !== "complete") {
        return;
    }
    sendMessage("tab-loaded", {}, { context: "content-script", tabId });
});

onMessage("get-current-tab", async () => {
    try {
        const tab = await browser.tabs.get(previousTabId);
        return {
            title: tab?.id,
        };
    } catch {
        return {
            title: undefined,
        };
    }
});
