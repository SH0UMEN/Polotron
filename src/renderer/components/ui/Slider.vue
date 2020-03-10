<template>
    <vue-slider :silent="true" v-model="tValue" class="slider" :minRange="minRange" :maxRange="maxRange"></vue-slider>
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
            minRange: {
                type: Number,
                default: 0,
            },
            maxRange: {
                type: Number,
                default: 100,
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