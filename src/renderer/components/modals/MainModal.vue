<template>
    <modal :clickToClose="false" :draggable="true" :name="name" class="modal">
        <div class="modal__header">
            <span class="modal__title">{{ title }}</span>
            <main-button :bordered="true" @click="$modal.hide(name)" class="modal__close">&times;</main-button>
        </div>
        <div class="modal__content">
            <slot></slot>
        </div>
    </modal>
</template>

<script>
    import MainButton from "../ui/Button"

    export default {
        name: "MainModal",
        props: {
            name: {
                required: true,
                type: String
            },
            title: {
                required: true,
                type: String
            }
        },
        components: {
            MainButton,
        }
    }
</script>

<style lang="sass">
    @import "../../assets/sass/main-modal"
</style>