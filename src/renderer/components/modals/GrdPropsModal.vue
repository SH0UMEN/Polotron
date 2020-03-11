<template>
    <main-modal :title="'Настройка слоя '" name="grd-props-modal">
        <form action="" class="modal__form">
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

            <!--<div class="modal__form-field">-->
            <!--<span class="modal__form-field-title">Не показывать с/по (%): </span>-->
            <!--<slider v-model="hidingInterval" class="modal__form-range"></slider>-->
            <!--</div>-->
        </form>

        <div class="modal__bottom">
            <main-button :disabled="inProcess" :filled="true" @click="readMatrix">
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
                layer: LayersStore.getInstance().layers[this.$store.state.Layers.selectedLayer],
                layerName: this.layer.name,
                levels: this.layer.levels,
                clippingInterval: [0, 100],
                hidingInterval: [0, 100],
                colors: ['#00ff00', '#ff0000'],
                inProcess: false
            }
        },
        methods: {
            fileNameChanged(e) {
                this.layerName = path.basename(e[0]).split(".")[0]
            },
            readMatrix() {
                if(!this.inProcess) {
                    this.inProcess = true;
                    let store = LayersStore.getInstance(),
                        layer = new DEM(this.layerName, this.fileNames[0], "GRD", this.levels,
                            this.clippingInterval, this.hidingInterval, this.colors),
                        id = store.addLayer(layer);

                    this.$store.commit('addLayer', id);
                    this.$modal.hide('grd-modal');
                    this.fileNames = [];
                    this.layerName = "";
                    this.levels = 20;
                    this.clippingInterval = [0, 100];
                    this.hidingInterval = [0, 100];
                    this.colors = ['#00ff00', '#ff0000'];
                    this.inProcess = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>