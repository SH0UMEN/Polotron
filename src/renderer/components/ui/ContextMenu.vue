<template>
    <div class="context-menu-wrapper">
        <slot>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "ContextMenu",
    }
</script>

<style lang="sass">
    @import "../../assets/sass/ui/context-menu"
</style>