<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

{#each data.posts as post}
    <a href="/~/{post.slug}">
        {post.title}
        <input type="checkbox" name="_" checked={post.public} id="" />
    </a>
{/each}
