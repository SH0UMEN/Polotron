<template>
  <main>
    <viewer></viewer>
    <layers-list-panel></layers-list-panel>
    <grd-modal></grd-modal>
    <grd-props-modal v-if="this.$store.state.Layers.selectedLayer"></grd-props-modal>
  </main>
</template>

<script>
  const electron = require('electron'),
        path = require('path');

  import LayersListPanel from "../components/panels/LayersListPanel"
  import GrdModal from "../components/modals/GrdModal"
  import GrdPropsModal from "../components/modals/GrdPropsModal"
  import Viewer from "../components/Viewer"

  export default {
    name: 'MainWindow',
    data() {
      return {

      }
    },
    components: {
      GrdModal,
      GrdPropsModal,
      Viewer,
      LayersListPanel
    },
    mounted() {
      electron.ipcRenderer.on('openGRD', (event) => {
        this.$modal.show('grd-modal')
      })
    },
  }
</script>

<style lang="sass">
  @import "../assets/fonts/roboto/roboto.css"
  @import "../assets/css/all.css"
  @import "../assets/sass/main"
</style>
