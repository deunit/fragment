<script lang="ts">
    import { writable } from "svelte/store";

    let enabled = writable(false);
    let content: HTMLElement;
</script>

<slot {enabled} name="trigger" />
<slot {enabled} {content} name="content" />