<template>
  <main>
    <viewer></viewer>
    <layers-list-panel></layers-list-panel>
    <grd-modal></grd-modal>
    <grd-props-modal></grd-props-modal>
    <grd-animation-modal></grd-animation-modal>
  </main>
</template>

<script>
  const electron = require('electron'),
        path = require('path');

  import LayersListPanel from "../components/panels/LayersListPanel"
  import GrdModal from "../components/modals/GrdModal"
  import GrdPropsModal from "../components/modals/GrdPropsModal"
  import GrdAnimationModal from "../components/modals/GrdAnimationModal"
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
      LayersListPanel,
      GrdAnimationModal
    },
    mounted() {
      electron.ipcRenderer.on('openGRD', (event) => {
        this.$modal.show('grd-modal')
      }),
      electron.ipcRenderer.on('openGRDAnimation', (event) => {
        this.$modal.show('grd-animation-modal')
      })
    },
  }
</script>

<style lang="sass">
  @import "../assets/fonts/roboto/roboto.css"
  @import "../assets/css/all.css"
  @import "../assets/sass/main"
</style>
