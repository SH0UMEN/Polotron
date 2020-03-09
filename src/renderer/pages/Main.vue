<template>
  <main>
    <div>
      <canvas v-for="layer,i in $store.getters.getLayersList" :key="i"
              :ref="'canvas-'+i" height="0" width="0">
      </canvas>
    </div>
    <grd-modal></grd-modal>
  </main>
</template>

<script>
  const electron = require('electron'),
        path = require('path');

  import GrdModal from "../components/modals/GrdModal"
  import Layer from "../components/Layer"
  import LayersStore from "../helpers/LayersStore"
  import Vue from "vue"

  export default {
    name: 'MainWindow',
    data() {
      return {
        layersStore: Vue.Observable(LayersStore.getInstance())
      }
    },
    components: {
      GrdModal,
      Layer
    },
    mounted() {
      electron.ipcRenderer.on('openGRD', (event) => {
        this.$modal.show('grd-modal')
      })
    },
    watch: {
      layersStore(layers) {
        console.log('hey');
        this.$nextTick(()=>{
          for(let i = 0; i < layers.length; i++) {
            if(!layers[i].isDrawed) {
            }
          }
        });
      }
    },
  }
</script>

<style lang="sass">
  @import "../assets/fonts/roboto/roboto.css"
  @import "../assets/css/all.css"
  @import "../assets/sass/main"
</style>
