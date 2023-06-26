<script lang="ts">
    import { browser } from "$app/environment";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

{#if browser}
    {#await import("./entry.svelte") then entry}
        <svelte:component this={entry.default} {data} />
    {/await}
{/if}
