<script>
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    console.log($page.data);
</script>



{#if browser}
    {#await import("./entry.svelte")}
        {" "}
    {:then e} 
        <svelte:component this={e.default} />
    {/await}
    {:else}
        <noscript>
            Please allow javascript
        </noscript>
{/if}