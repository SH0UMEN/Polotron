<template>
    <vue-slider :silent="true" :interval="interval" v-model="tValue" class="slider" :min="min" :max="max"></vue-slider>
</template>

<script>
    import VueSlider from 'vue-slider-component'

    export default {
        name: "Slider",
        components: {
            VueSlider
        },
        props: {
            value: {
                type: [Array, Number],
                default: 0
            },
            min: {
                type: Number,
                default: 0,
            },
            max: {
                type: Number,
                default: 100,
            },
            interval: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                tValue: this.value
            }
        },
        watch: {
            tValue(val) {
                this.$emit('input', val);
            }
        }
    }
</script>

<style lang="sass">
    @import "../../assets/sass/ui/slider"
</style>