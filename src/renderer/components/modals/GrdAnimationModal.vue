<template>
    <main-modal title="Импорт матриц .grd для создания анимации" name="grd-animation-modal">
        <form action="" class="modal__form">
            <div class="modal__form-field">
                <span class="modal__form-field-title">Выберите файлы </span>
                <file-input class="modal__form-field-input" :multiple="true" v-model="fileNames" @input="fileNameChanged"></file-input>
            </div>
            <div class="modal__form-field">
                <span class="modal__form-field-title">Название слоя: </span>
                <main-input class="modal__form-field-input" v-model="layerName"></main-input>
            </div>

            <div class="modal__form-field">
                <span class="modal__form-field-title">Кол-во интервалов: </span>
                <main-input type="number" class="modal__form-field-input" v-model="levels"></main-input>
            </div>

<!--            <div class="modal__form-field">-->
<!--                <span class="modal__form-field-title">Обрезать с/по (%): </span>-->
<!--                <slider v-model="clippingInterval" class="modal__form-range"></slider>-->
<!--            </div>-->

            <div class="modal__form-field">
                <span class="modal__form-field-title">Цветовая палитра: </span>
                <palette-input v-model="colors"></palette-input>
            </div>
        </form>

        <div class="modal__bottom">
            <main-button :disabled="!valid" :filled="true" @click="readMatrix">
                Построить
            </main-button>
        </div>
    </main-modal>
</template>

<script>
    import MainModal from "./MainModal"
    import MainInput from "../ui/MainInput"
    import FileInput from "../ui/FileInput"
    import MainButton from "../ui/Button"
    import Slider from '../ui/Slider'
    import 'vue-slider-component/theme/antd.css'
    import {GRDAnimation} from "../../helpers/Layers"
    import LayersStore from "../../helpers/LayersStore"
    import PaletteInput from "../ui/PaletteInput"
    const path = require('path');

    export default {
        name: "GrdModal",
        components: {
            MainModal,
            MainInput,
            FileInput,
            MainButton,
            Slider,
            PaletteInput
        },
        data() {
            return {
                fileNames: [],
                layerName: "",
                levels: 20,
                clippingInterval: [0, 100],
                colors: ['#38761d', '#ffff00', '#ff0000'],
                inProcess: false
            }
        },
        computed: {
            valid() {
                return this.fileNames.length > 0 &&
                    this.colors.length > 1 &&
                    this.levels > 5 && this.layerName.length > 0;
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
                        layer = new GRDAnimation(this.layerName, this.fileNames, this.levels, this.colors),
                        id = store.addLayer(layer);

                    this.$store.commit('addLayer', id);
                    this.$modal.hide('grd-animation-modal');
                    this.fileNames = [];
                    this.layerName = "";
                    this.levels = 20;
                    this.clippingInterval = [0, 100];
                    this.colors = ['#38761d', '#ffff00', '#ff0000'];
                    this.inProcess = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>