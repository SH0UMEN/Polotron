<template>
	<v-zoomer :doubleClickToZoom="false" ref="zoomer" :limit-translation="false" :min-scale="0.1" class="viewer">
		<div class="viewer__inner" @mousedown="isDragged = true" @mouseup="isDragged = false"
		     :class="{ 'viewer__inner_dragged': isDragged }" >
			<div class="viewer__layer-wrapper" v-for="layerID in $store.state.Layers.layers.map(x=>x).reverse()"
			     :class="{ 'viewer__layer-wrapper_hidden': layersStore.layers[layerID].hidden }" :key="layerID">
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
			layersStore: LayersStore.getInstance()
		}
	},

	mounted() {
		this.$refs.zoomer.zoomOut(0.8)
	},

	watch: {
		layers(layers) {
			this.$nextTick(()=>{
				for(let id of this.layers) {
					let layer = this.layersStore.layers[id];

					if(!layer.isDrawed) {
						layer.read().then(()=>{
							layer.bindCanvas(this.$refs['canvas-'+id][0]);
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