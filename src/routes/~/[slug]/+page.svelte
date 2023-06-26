<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData, PageServerData } from "./$types";
    import { page } from "$app/stores";
    import { IsAppOwner } from "$lib/svutil";
    import { browser } from "$app/environment";

    const rootUrl = new URL($page.url);
    rootUrl.pathname = "/";

    export let data: PageServerData & PageData;
</script>

<div class="header">
    {#if data.isOwner}
        <div />
        <div>
            <button>Edit</button>
        </div>
    {/if}
</div>

<article class="content">
    <h1 class="title" dir="auto">
        {data.post.title}
    </h1>
    <span>{new Date(data.post.posted).toDateString()}</span>
    {@html data.post.content}
</article>

<style lang="scss">
    .title {
        font-weight: 400;
    }

    .header {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
