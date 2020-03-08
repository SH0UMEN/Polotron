<template>
    <main-modal title="Импорт модели рельефа .grd" name="grd-modal">
        <form action="" class="modal__form">
            <div class="modal__form-field">
                <span class="modal__form-field-title">Название слоя: </span>
                <main-input class="modal__form-field-input" v-model="layerName"></main-input>
            </div>
        </form>
    </main-modal>
</template>

<script>
    import MainModal from "./MainModal"
    import MainInput from "../ui/MainInput"

    export default {
        name: "GrdModal",
        components: {
            MainModal,
            MainInput
        },
        data() {
            return {
                fileName: "",
                layerName: "",
            }
        }
    }
</script>

<style scoped>

</style>