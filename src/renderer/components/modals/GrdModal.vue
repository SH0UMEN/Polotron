<template>
    <main-modal title="Импорт модели рельефа .grd" name="grd-modal">
        <form action="" class="modal__form">
            <div class="modal__form-field">
                <span class="modal__form-field-title">Путь до слоя: </span>
                <file-input class="modal__form-field-input" v-model="fileNames" @input="fileNameChanged"></file-input>
            </div>
            <div class="modal__form-field">
                <span class="modal__form-field-title">Название слоя: </span>
                <main-input class="modal__form-field-input" v-model="layerName"></main-input>
            </div>

            <div class="modal__form-field">
                <span class="modal__form-field-title">Кол-во интервалов: </span>
                <main-input type="number" class="modal__form-field-input" v-model="levels"></main-input>
            </div>
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
    import FileInput from "../ui/FileInput"
    import MainButton from "../ui/Button"
    import {DEM} from "../../helpers/Layers"
    import LayersStore from "../../helpers/LayersStore"
    const path = require('path');
    const fs = require('fs');
    const g2 = require('gradient2')

    export default {
        name: "GrdModal",
        components: {
            MainModal,
            MainInput,
            FileInput,
            MainButton
        },
        data() {
            return {
                fileNames: [],
                layerName: "",
                levels: 20,
                inProcess: false
            }
        },
        methods: {
            fileNameChanged(e) {
                this.layerName = path.basename(e[0]).split(".")[0]
            },
            readMatrix() {
                let layer = new DEM(this.layerName, this.fileNames[0], "GRD", this.levels);
                let store = LayersStore.getInstance();
                store.addLayer(layer);
                this.$modal.hide('grd-modal');
                this.fileNames = [];
                this.layerName = "";
                this.levels = 20;
            }
        }
    }
</script>

<style scoped>

</style>