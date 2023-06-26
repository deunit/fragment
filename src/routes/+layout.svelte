<script>
    import { navigating } from '$app/stores';
    import Loading from '$lib/components/loading.svelte';
    import '$lib/style/root.scss'
</script>



<Loading loading={!!$navigating} />    

<slot />


