<template>
    <main-modal title="Построение векторов" name="vector-modal">
        <form action="" class="modal__form">
            <div class="modal__form-field">
                <span class="modal__form-field-title">Файл с матрицей (h): </span>
                <file-input class="modal__form-field-input" v-model="hFileNames" @input="fileNameChanged"></file-input>
            </div>
            <div class="modal__form-field">
                <span class="modal__form-field-title">Векторы (x-координата): </span>
                <file-input class="modal__form-field-input" v-model="xFileNames"></file-input>
            </div>
            <div class="modal__form-field">
                <span class="modal__form-field-title">Векторы (y-координата): </span>
                <file-input class="modal__form-field-input" v-model="yFileNames"></file-input>
            </div>
            <div class="modal__form-field">
                <span class="modal__form-field-title">Название слоя: </span>
                <main-input class="modal__form-field-input" v-model="layerName"></main-input>
            </div>
<!--            <div class="modal__form-field">-->
<!--                <span class="modal__form-field-title">Цветовая палитра: </span>-->
<!--                <palette-input v-model="colors"></palette-input>-->
<!--            </div>-->
        </form>

        <div class="modal__bottom">
            <main-button :disabled="!valid" :filled="true" @click="read">
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
    import { GRDVectorLayer } from "../../helpers/Layers"
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
                hFileNames: [],
                xFileNames: [],
                yFileNames: [],
                layerName: "",
                //colors: ['#00ff00', '#ff0000'],
                inProcess: false
            }
        },
        computed: {
            valid() {
                return this.hFileNames.length == 1 &&
                    this.xFileNames.length == 1 &&
                    this.yFileNames.length == 1 && this.layerName.length > 0;
            }
        },
        methods: {
            fileNameChanged(e) {
                this.layerName = path.basename(e[0]).split(".")[0]
            },
            read() {
                if(!this.inProcess) {
                    this.inProcess = true;
                    let store = LayersStore.getInstance(),
                        layer = new GRDVectorLayer(this.layerName, this.hFileNames[0], this.xFileNames[0],
                                                    this.yFileNames[0]),
                        id = store.addLayer(layer);

                    this.$store.commit('addLayer', id);
                    this.$modal.hide('vector-modal');
                    this.fileNames = [];
                    this.layerName = "";
                    //this.colors = ['#00ff00', '#ff0000'];
                    this.inProcess = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>