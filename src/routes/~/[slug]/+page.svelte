<script lang="ts">
    import type { PageData, PageServerData } from "./$types";
    import { page } from "$app/stores";
    import style from '$lib/style/elements.module.scss'

    

    const rootUrl = new URL($page.url);
    rootUrl.pathname = "/";

    export let data: PageServerData & PageData;
</script>

<div class="{style.header}">
    {#if data.isOwner}
        <div />
        <div>
            <a href="/edit/{data.post.slug}" class="{style.button}">Edit</a>
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

   
</style>
