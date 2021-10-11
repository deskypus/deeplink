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
import "virtual:windi.css";
import "../style.scss";

const props = defineProps({
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
    query.push(`repo=${encodeURIComponent(props.href)}`);
    query.push(`projectGroupName=${props.projGroupName}`);
    query.push(`projectName=${props.projectName}`);
    return `pulumidesktop://projects?source=console&${query.join("&")}`;
});
</script>
