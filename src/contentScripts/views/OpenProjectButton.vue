<template>
    <a
        class="mr-8 primary mdc-button mdc-button--outlined mat-mdc-outlined-button mat-unthemed mat-mdc-button-base ng-star-inserted"
        :href="formattedHref"
        @click.stop
        target="_blank"
        rel="noopener"
    >
        <span class="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
        <span class="mdc-button__label"> Open in desktop </span>
        <span class="mat-mdc-focus-indicator"></span>
        <span class="mat-mdc-button-touch-target"></span>
        <span class="mat-mdc-button-ripple"></span>
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
