<script>
    import { browser } from "$app/environment";

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