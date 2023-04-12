import { useLocalStorage } from "@vueuse/core";

// TODO: This requires the storage permission in the manifest.
// This is currently unused so the permission was removed.
export const storageDemo = useLocalStorage("webext-demo", "Storage Demo", { listenToStorageChanges: true });
