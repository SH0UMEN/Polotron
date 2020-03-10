<template>
    <div class="layers-list-panel">
        <draggable class="layers-list-panel__container" v-model="layersID" @change="orderChanged" @start="drag=true" @end="drag=false">
            <div class="layers-list-panel__layer" v-for="id in layersID">
                <i class="fas fa-ellipsis-v layers-list-panel__drag"></i>
                <span class="layers-list-panel__layer-title">{{ layers[id].title }} ({{ id }})</span>
                <label class="layers-list-panel__vis-changer">
                    <input v-model="layers[id].hidden" @change="visibilityChanged($event, id)" type="checkbox">
                    <i class="far fa-eye"></i>
                </label>
            </div>
        </draggable>
    </div>
</template>

<script>
    import Draggable from 'vuedraggable'
    import LayersStore from '../../helpers/LayersStore'

    export default {
        name: "LayersListPanel",
        components: {
            Draggable
        },
        data() {
            return {
                layers: LayersStore.getInstance().layers,
                layersID: this.$store.state.Layers.layers
            }
        },
        methods: {
            orderChanged() {
                this.$store.commit('setLayers', this.layersID)
            },
            visibilityChanged(e, id) {
                this.$store.commit('redraw');
            }
        }
    }
</script>

<style lang="sass">
    @import "../../assets/sass/components/panels/layers-list-panel"
</style>