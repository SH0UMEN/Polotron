<template>
    <v-zoomer ref="zoomer" :limit-translation="false" :min-scale="0.1" class="viewer">
        <div class="viewer__inner" @mousedown="isDragged = true" @mouseup="isDragged = false"
             :class="{ 'viewer__inner_dragged': isDragged }" >
            <div class="viewer__layer-wrapper" v-for="layerID in $store.getters.getLayersList" :key="layerID">
                <canvas class="viewer__layer" :ref="'canvas-'+layerID" height="0" width="0"></canvas>
            </div>
        </div>
    </v-zoomer>
</template>

<script>
    import LayersStore from "../helpers/LayersStore"

    export default {
        name: "Viewer",

        data() {
            return {
                isDragged: false,
            }
        },

        mounted() {
            this.$refs.zoomer.zoomOut(0.8)
        },

        watch: {
            layers(layers) {
                let store = LayersStore.getInstance();

                this.$nextTick(()=>{
                    for(let id of layers) {
                        let layer = store.layers[id];
                        layer.read().then(()=>{
                            layer.bindCanvas(this.$refs['canvas-'+id][0]);
                            layer.draw();
                        })
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