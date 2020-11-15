<template>
    <button class="main-button" type="button"
            :disabled="disabled"
            :class="{ 'main-button_bordered': bordered, 'main-button_filled': filled }"
            @click.prevents="$emit('click', $event)">
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
            },
            disabled: {
                type: Boolean,
                default: false
            },
            filled: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="sass">
    @import "../../assets/sass/ui/button"
</style>