<template>
    <a
        class="ml-8 mat-focus-indicator mat-raised-button mat-button-base mat-primary"
        :href="formattedHref"
        target="_blank"
        rel="noopener"
    >
        <span class="mat-button-wrapper">Open Locally</span>
        <span class="mat-ripple mat-button-ripple"></span>
        <span class="mat-button-focus-overlay"></span>
    </a>
</template>
<script setup lang="ts">
import "virtual:windi.css";

const props = defineProps({
    href: {
        type: String,
        required: true,
    },
});

const formattedHref = computed(() => `pulumidesktop://projects?repo=${encodeURIComponent(props.href)}`);
</script>
