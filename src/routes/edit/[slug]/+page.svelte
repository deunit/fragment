<script lang="ts">
    import { browser } from "$app/environment";
    import type { z } from "zod";
    import type { PageData } from "./$types";
    import type Post from "$lib/models/post";

    export let data: PageData & {
        post: z.infer<typeof Post.schema>
    };
</script>

{#if browser}
    {#await import("./entry.svelte") then entry}
        <svelte:component this={entry.default} {data} />
    {/await}
{/if}
