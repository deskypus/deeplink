import { sendMessage, onMessage } from "webext-bridge/background";
import browser, { Tabs } from "webextension-polyfill";

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
    // We don't care about the tab's status if the URL isn't what we want.
    if (!tab.url?.match(/^(https:\/\/app\.pulumi\.com)(\/.*\/)(projects)$/g)) {
        return;
    }
    // Don't do anything if the tab hasn't finished loading.
    if (tab.status === "loading") {
        return;
    }
    sendMessage("tab-loaded", {}, { context: "content-script", tabId });
});

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
