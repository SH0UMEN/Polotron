<template>
    <div class="file-input">
        <main-input v-model=""></main-input>
    </div>
</template>

<script>
    import MainInput from "./MainInput"

    export default {
        name: "FileInput",
        components: {
            MainInput
        },
        props: {
            value: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                tValue: this.value
            }
        },
    }
</script>

<style lang="sass">
    @import "../../assets/sass/ui/file-input"
</style>