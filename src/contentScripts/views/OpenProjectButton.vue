<template>
    <a class="mat-focus-indicator mat-button mat-button-base mat-primary" :href="href" target="_blank"></a>
</template>
<script setup lang="ts">
defineProps({
    href: {
        type: String,
        required: true,
    },
});
</script>
