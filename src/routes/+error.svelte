<script>
    import { page, updated } from "$app/stores";
    let error = $page.error;
    console.log($page.error?.code);
</script>

<svelte:head>
    <title>Error - {error?.message}</title>
</svelte:head>

<main class="main">
    <h1 class="title">
        {#if error?.code}
         {error.code} |
        {/if}
        {error?.message}
        
    </h1>
    <p>
        If you think this is a mistake please <a
            href="https://github.com/deunit/tiny-post/issues/new"
            target="_blank">raise an issue</a
        >
    </p>
</main>

<style>
    .main {
        width: 100vw;
        height: 100dvh;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: xx-large;
        font-weight: 500;
        color: #444;
    }

    .title{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
</style>
