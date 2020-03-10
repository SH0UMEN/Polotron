<template>
    <div class="palette">
        <div v-for="color, i in tValue" class="palette__color-wrapper">
            <swatches :trigger-style="triggerStyle" v-model="tValue[i]" colors="text-advanced"></swatches>
            <main-button @click="deleteColor(i)">&times;</main-button>
        </div>
        <main-button :filled="true" @click="tValue.push('#000000')"><i class="fas fa-plus"></i></main-button>
    </div>
</template>

<script>
    import Swatches from 'vue-swatches'
    import MainButton from "./Button"
    import "vue-swatches/dist/vue-swatches.min.css"

    export default {
        name: "PaletteInput",
        props: {
            value: {
                type: Array,
                required: true
            }
        },
        components: {
            Swatches,
            MainButton
        },
        data() {
            return {
                tValue: this.value,
                triggerStyle: {
                    width: "30px",
                    height: "30px",
                    borderRadius: "0"
                }
            }
        },
        watch: {
            tValue(val) {
                this.$emit("input", val)
            }
        },
        methods: {
            deleteColor(i) {
                this.tValue.splice(i, 1);
            }
        }
    }
</script>

<style lang="sass">
    @import "../../assets/sass/ui/palette-input"
</style>