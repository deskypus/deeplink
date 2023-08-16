<template>
    <main class="w-[300px] px-4 py-5 text-center text-gray-700">
        <div class="w-full flex items-center justify-center">
            <span class="text-base mr-2">Permissions granted:</span>
            <div class="i-mdi-checkbox-marked-circle text-lg text-green-700" v-if="hasPermissions" />
            <div class="i-mdi-alert-circle text-lg text-red-700" v-else />
        </div>
        <button class="btn mt-2" v-if="!hasPermissions" @click="requestPermissions">Show permissions request</button>
        <div class="mt-2" v-if="hasPermissions">
            Head over to <a href="https://app.pulumi.com" target="_blank">https://app.pulumi.com</a> and browse any of
            your organizations.
        </div>
    </main>
</template>

<script setup lang="ts">
const pulumiConsole = "https://app.pulumi.com/*";
const hasPermissions = ref(false);

onMounted(async () => {
    hasPermissions.value = await browser.permissions.contains({
        origins: [pulumiConsole],
    });
});

async function requestPermissions() {
    await browser.permissions.request({
        origins: [pulumiConsole],
    });

    hasPermissions.value = await browser.permissions.contains({
        origins: [pulumiConsole],
    });
}
</script>
