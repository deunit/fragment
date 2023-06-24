<script lang="ts">
    import { icons } from 'feather-icons'

    export let name: keyof typeof icons
    export let size = 16
    const cn = ""
    export {
        cn as class
    }
</script>



{
    @html icons[name].toSvg({
        class: cn,
        width: size,
        height: size
    })
}


