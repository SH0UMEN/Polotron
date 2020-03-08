<template>
    <button class="main-button" :class="{ 'main-button_bordered': bordered }" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "Button",
        props: {
            bordered: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="sass">
    @import "../../assets/sass/ui/button"
</style>