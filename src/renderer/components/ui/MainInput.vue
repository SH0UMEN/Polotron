<template>
    <label class="main-input">
        <input class="main-input__input" :placeholder="placeholder"
               type="text" v-model="tValue" @input="$emit('input', tValue)">
    </label>
</template>

<script>
    export default {
        name: "MainInput",
        props: {
            placeholder: {
                type: String,
                default: ""
            },
            value: {
                required: true,
                type: [String, Number],
            }
        },
        data() {
            return {
                tValue: this.value,
            }
        },
        watch: {
            value(value) {
                this.tValue = value
            }
        }
    }
</script>

<style lang="sass">
    @import "../../assets/sass/ui/main-input"
</style>