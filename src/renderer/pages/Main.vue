<template>
  <main>
    <canvas ref="canvas"></canvas>
    <grd-modal></grd-modal>
  </main>
</template>

<script>
  const electron = require('electron'),
        path = require('path');

  import { DEM } from "../halpers/Layers";
  import GrdModal from "../components/modals/GrdModal"

  export default {
    name: 'MainWindow',
    data() {
      return {
      }
    },
    components: {
      GrdModal
    },
    mounted() {
      electron.ipcRenderer.on('openGRD', (event) => {
        this.$modal.show('grd-modal')
      })
    },
    methods: {
      newLayer() {
        let filename = electron.remote.dialog.showOpenDialog({properties: ['openFile']})[0],
            layerTitle = path.basename(filename).split(".")[0];
        DEM.readSource(layerTitle, filename).then((layer) => {
          console.log(layer)
        })
      }
    }
  }
</script>

<style lang="sass">
  @import "../assets/fonts/roboto/roboto.css"
  @import "../assets/css/all.css"
  @import "../assets/sass/main"
</style>
