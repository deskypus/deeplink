<template>
    <a
        class="mr-8 mat-focus-indicator mat-raised-button mat-button-base mat-primary"
        :href="formattedHref"
        @click.stop
        target="_blank"
        rel="noopener"
    >
        <span class="mat-button-wrapper">Open Locally</span>
        <span class="mat-ripple mat-button-ripple"></span>
        <span class="mat-button-focus-overlay"></span>
    </a>
</template>
<script setup lang="ts">
import "uno.css";
import "../style.scss";

const props = defineProps({
    accountName: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
    projGroupName: {
        type: String,
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
});

const formattedHref = computed(() => {
    const query = [];
    query.push(`accountName=${props.accountName}`);
    query.push(`repo=${encodeURIComponent(props.href)}`);
    query.push(`projectGroupName=${props.projGroupName}`);
    return `pulumidesktop://projects/${props.projectName}?source=console&${query.join("&")}`;
});
</script>
