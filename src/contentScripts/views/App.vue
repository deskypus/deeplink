<script setup lang="ts">
import { PropType, onMounted } from "vue";

import "virtual:windi.css";

const props = defineProps({
    projectContainers: {
        type: Object as PropType<HTMLCollection>,
    },
});

onMounted(() => {
    const projectContainers = props.projectContainers;
    const length = projectContainers?.length || 0;

    for (let i = 0; i < length; i++) {
        const projectContainer = projectContainers?.item(i);
        if (!projectContainer) {
            continue;
        }

        const projectRepoAnchorEl = projectContainer.querySelectorAll("app-project-group .pul-link.external-link");
        // There should be only one anchor (<a>) tag in the `app-project-group` element.
        const repoUrl = projectRepoAnchorEl.item(0).getAttribute("href");
        console.log("repoUrl", repoUrl);

        const projectNameEl = projectContainer.querySelectorAll(
            ".project-container-inner .projects app-project-card .project-card .mat-card-content app-project-header .project-label .proj-project-name"
        );

        const projectNames: string[] = [];
        projectNameEl.forEach((p) => projectNames.push(p.textContent!));
        console.log("project names", projectNames);
    }
});
</script>
