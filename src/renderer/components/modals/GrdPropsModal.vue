<template>
    <main-modal :title="'Настройка слоя '" @before-open="setLayer" name="grd-props-modal">
        <form action="" class="modal__form">
            <div class="modal__form-field">
                <div class="zs">
                    Интервал высот: [{{ zMin }} ; {{ zMax }}]
                </div>
            </div>
            <div class="modal__form-field">
                <span class="modal__form-field-title">Название слоя: </span>
                <main-input class="modal__form-field-input" v-model="layerName"></main-input>
            </div>

            <div class="modal__form-field">
                <span class="modal__form-field-title">Кол-во интервалов: </span>
                <main-input type="number" class="modal__form-field-input" v-model="levels"></main-input>
            </div>

            <div class="modal__form-field">
                <span class="modal__form-field-title">Обрезать с/по (%): </span>
                <slider v-model="clippingInterval" class="modal__form-range"></slider>
            </div>

            <div class="modal__form-field">
                <span class="modal__form-field-title">Цветовая палитра: </span>
                <palette-input v-model="colors"></palette-input>
            </div>

            <div class="modal__form-field">
                <span class="modal__form-field-title">Показывать с/по: </span>
                <div class="inputs">
                    <main-input type="number" v-model.number="hidingMin"></main-input>
                    <main-input type="number" v-model.number="hidingMax"></main-input>
                </div>
            </div>
        </form>

        <div class="modal__bottom">
            <main-button :disabled="inProcess" :filled="true" @click="redraw">
                Построить
            </main-button>
        </div>
    </main-modal>
</template>

<script>
    import MainModal from "./MainModal"
    import MainInput from "../ui/MainInput"
    import MainButton from "../ui/Button"
    import Slider from '../ui/Slider'
    import 'vue-slider-component/theme/antd.css'
    import {DEM} from "../../helpers/Layers"
    import LayersStore from "../../helpers/LayersStore"
    import PaletteInput from "../ui/PaletteInput"
    const path = require('path');

    export default {
        name: "GrdPropsModal",
        components: {
            MainModal,
            MainInput,
            MainButton,
            Slider,
            PaletteInput
        },
        data() {
            return {
                layerID: 0,
                layerName: "",
                levels: 20,
                clippingInterval: [0, 100],
                hidingMin: 0,
                hidingMax: 0,
                zMin: 0,
                zMax: 0,
                colors: ['#00ff00', '#ff0000'],
                inProcess: false
            }
        },
        watch: {
            // layerID(val) {
            //     console.log(val);
            //     let layer = this.layers[val];
            //     this.layerName = layer.title;
            //     this.lavels = layer.levels;
            // }
        },
        methods: {
            setLayer() {
                this.layerID = this.$store.state.Layers.selectedLayer;
                let layer = LayersStore.getInstance().layers[this.layerID];
                this.layerName = layer.title;
                this.levels = layer.levels;
                this.clippingInterval = layer.clipping;
                this.zMin = layer.Zmin;
                this.zMax = layer.Zmax;
                this.colors = layer.palette;
                this.hidingMin = layer.hiding[0];
                this.hidingMax = layer.hiding[1];
            },
            redraw() {
                let layer = LayersStore.getInstance().layers[this.layerID];
                layer.title = this.layerName;
                layer.levels = this.levels;
                layer.clipping = this.clippingInterval;
                layer.hiding = [this.hidingMin, this.hidingMax];
                layer.draw();
                this.$store.commit("redraw");
                this.$modal.hide('grd-props-modal');
            }
        }
    }
</script>

<style lang="sass">

</style>