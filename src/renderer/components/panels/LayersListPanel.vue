<template>
    <div class="layers-list-panel">
        <draggable class="layers-list-panel__container" v-model="layersID" @change="orderChanged" @start="drag=true" @end="drag=false">
            <div class="layers-list-panel__layer"
                 v-for="id in layersID"
                 @click="selectedLayer = id"
                 :class="{ 'layers-list-panel__layer_selected': id == selectedLayer }"
                 @contextmenu.prevent="openMenu($event, id)">
                <i class="fas fa-ellipsis-v layers-list-panel__drag"></i>
                <span class="layers-list-panel__layer-title">{{ layersStore.layers[id].title }} ({{ id }})</span>
                <label class="layers-list-panel__vis-changer">
                    <input v-model="layersStore.layers[id].hidden" @change="visibilityChanged($event, id)" type="checkbox">
                    <i class="far fa-eye"></i>
                </label>
            </div>
        </draggable>

        <context-menu>
            <vue-context ref="menu">
                <li>
                    <button @click="openSettingsWindow">Настройки</button>
                </li>
                <li>
                    <button @click="deleteLayer">Удалить слой</button>
                </li>
            </vue-context>
        </context-menu>
    </div>
</template>

<script>
    import Draggable from 'vuedraggable'
    import LayersStore from '../../helpers/LayersStore'
    import ContextMenu from '../ui/ContextMenu'
    import VueContext from 'vue-context'

    export default {
    	props: {
    	    value: {
    	    	type: Number,
	        }
	    },
        name: "LayersListPanel",
        components: {
            Draggable,
            ContextMenu,
            VueContext
        },
        data() {
            return {
                layersStore: LayersStore.getInstance(),
                layersID: this.$store.state.Layers.layers,
                selectedLayer: 0
            }
        },
	    watch: {
    	    selectedLayer(val) {
    	    	this.tValue = val;
	        }
	    },
	    computed: {
			tValue: {
				get() {
					return this.value;
				},
				set(val) {
					this.$emit('input', val);
				}
			}
	    },
        methods: {
            orderChanged() {
                this.$store.commit('setLayers', this.layersID)
            },
            visibilityChanged(e, id) {
                this.$store.commit('redraw');
            },
            deleteLayer() {
                this.$store.commit('removeLayer', this.selectedLayer);
            },
            openMenu(e, id) {
                this.$refs.menu.open(e);
                this.selectedLayer = id;
            },
            openSettingsWindow() {
                let layer = this.layersStore.layers[this.selectedLayer];
                this.$store.commit("selectLayer", this.selectedLayer);

                if(layer.type == "GRD" || layer.type == "GRD-Animation") {
                    this.$modal.show('grd-props-modal');
                }
            }
        }
    }
</script>

<style lang="sass">
    @import '~vue-context/src/sass/vue-context'
    @import "../../assets/sass/components/panels/layers-list-panel"
</style>