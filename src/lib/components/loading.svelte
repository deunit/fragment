<script lang="ts">
    import { blur } from "svelte/transition";

    export let loading: boolean;
</script>


{#if loading}
    <div in:blur out:blur class="loading">

    </div>
{/if}



<style>
    .loading{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.35);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>