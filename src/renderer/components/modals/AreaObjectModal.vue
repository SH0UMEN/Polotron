<template>
  <main-modal title="Создание площадного объекта" name="area-object-modal">
    <h3 v-if="layers.length == 0">Не загружен ни один файл рельефа!</h3>
    <form action="" v-else class="modal__form">
      <div class="modal__form-field">
        <span class="modal__form-field-title">Введите высоту площадного<br>объекта: </span>
        <main-input v-model="newZ" type="number"></main-input>
      </div>
    </form>
    <div class="modal__bottom">
      <main-button :filled="true">
        Задать координаты
      </main-button>
    </div>
  </main-modal>
</template>

<script>
  import MainModal from "./MainModal";
  import MainInput from "../ui/MainInput";
  import MainButton from "../ui/Button";

  export default {
    name: "AreaObjectModal",
    components: {MainInput, MainModal, MainButton},
    computed: {
      layers() {
        return this.$store.getters.getLayersList;
      }
    },
    data() {
      return {
        newZ: 0
      }
    }
  }
</script>

<style scoped>

</style>