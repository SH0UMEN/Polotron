<template>
    <div class="file-input">
        <main-input v-model="stringedValue"></main-input>
        <label class="file-input__label">
            <input class="file-input__input" type="file" @change="handleFiles" :multiple="multiple">
            <i class="far fa-folder-open"></i>
        </label>
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
                type: Array,
                default: []
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                tValue: this.value
            }
        },
        methods: {
            handleFiles(event) {
                this.tValue = [];

                for(let file of event.target.files) {
                    this.tValue.push(file.path);
                }

                this.$emit('input', this.tValue);
            }
        },
        computed: {
            stringedValue() {
                return this.tValue.join(';')
            }
        }
    }
</script>

<style lang="sass">
    @import "../../assets/sass/ui/file-input"
</style>