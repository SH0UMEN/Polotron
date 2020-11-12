<template>
  <canvas class="viewer" ref="canvas"></canvas>
</template>

<script>
    import LayersStore from "../helpers/LayersStore"
    import panzoom from 'pan-zoom'

    export default {
        name: "Viewer",

        data() {
            return {
                isDragged: false,
                layersStore: LayersStore.getInstance()
            }
        },

        mounted() {
            let canvas = this.$refs['canvas'];
            panzoom(canvas, e => {
            	console.log(e);
            });
        },

        watch: {
            layers(layers) {
                this.$nextTick(()=>{
                    for(let id of this.layers) {
                        let layer = this.layersStore.layers[id];

                        if(!layer.isDrawed) {
                            layer.read().then(()=>{
                                layer.bindCanvas(this.$refs['canvas']);
                                layer.draw();
                            })
                        }
                    }
                });
            }
        },

        computed: {
            layers() {
                return this.$store.getters.getLayersList;
            }
        }
    }
</script>

<style lang="sass">
    @import "../assets/sass/components/view/viewer"
</style>