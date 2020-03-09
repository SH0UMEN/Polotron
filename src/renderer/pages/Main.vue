<template>
  <main>
    <viewer></viewer>
    <grd-modal></grd-modal>
  </main>
</template>

<script>
  const electron = require('electron'),
        path = require('path');

  import GrdModal from "../components/modals/GrdModal"
  import Viewer from "../components/Viewer"

  export default {
    name: 'MainWindow',
    data() {
      return {

      }
    },
    components: {
      GrdModal,
      Viewer
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
