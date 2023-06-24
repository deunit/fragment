<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    console.log(data);
    
</script>

<article class="content">
    <h1 class="title" dir="auto">
        {data.post.title}
    </h1>
    <span>{new Date(data.post.posted).toDateString()}</span>
    {@html data.post.content}
</article>



<style lang="scss">
    .title{
        font-weight: 400;
    }
</style>