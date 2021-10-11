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

browser.tabs.onUpdated.addListener(
    (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => {
        if (tab.status !== "complete") {
            return;
        }
        sendMessage("tab-loaded", {}, { context: "content-script", tabId });
    },
    {
        urls: ["https://app.pulumi.com/*/projects", "https://app.pulumi.com/*/projects/"],
        properties: ["status"],
    }
);

onMessage("get-current-tab", async () => {
    try {
        const tab = await browser.tabs.get(previousTabId);
        if (tab?.id) {
            return {
                title: tab.id.toString(10),
            };
        }
    } catch (err) {
        console.error(`Could not get tab info for tab id ${previousTabId}`, err);
    }

    return {
        title: "",
    };
});
