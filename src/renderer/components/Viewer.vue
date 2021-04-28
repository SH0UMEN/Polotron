<template>
	<div class="viewer">
		<v-zoomer :doubleClickToZoom="false" ref="zoomer" :limit-translation="false" :min-scale="0.1" class="viewer__zoomer">
			<div class="viewer__inner" @mousedown="isDragged = true" @mouseup="isDragged = false"
				 :class="{ 'viewer__inner_dragged': isDragged }" >
				<div class="viewer__layer-wrapper" v-for="layerID in $store.state.Layers.layers.map(x=>x).reverse()"
					 :class="{ 'viewer__layer-wrapper_hidden': layersStore.layers[layerID].hidden }"
					 :key="layerID">
					<canvas class="viewer__layer" :ref="'canvas-'+layerID"
							@mouseenter="onLayerMouseEnter"
							@mouseleave="onLayerMouseLeave"
							@mousemove="onLayerMouseMove($event, layersStore.layers[layerID])"
							height="0" width="0">
					</canvas>
				</div>
			</div>
		</v-zoomer>
		<point-coordinates-panel v-if="hoveredCounter > 0" :coordinates="coordinates"></point-coordinates-panel>
	</div>
</template>

<script>
import PointCoordinatesPanel from "./panels/PointCoordinatesPanel";
import LayersStore from "../helpers/LayersStore";
const electron = require('electron');

export default {
	name: "Viewer",

	components: {
		PointCoordinatesPanel
	},

	data() {
		return {
			isDragged: false,
			layersStore: LayersStore.getInstance(),
			x: null,
			y: null,
			z: null,
			hoveredCounter: 0
		}
	},

	mounted() {
		this.$refs.zoomer.zoomOut(0.9);

		electron.ipcRenderer.on('unzoom', (event) => {
			this.$refs.zoomer.reset();
			this.$refs.zoomer.zoomOut(0.9);
		});
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
		},

		coordinates() {
			return this.x && this.y && this.z ? [this.x, this.y, this.z] : null;
		}
	},

	methods: {
		onLayerMouseMove(e, layer) {
			this.x = e.offsetX;
			this.y = e.offsetY;
			this.z = layer.data[this.y][this.x];
		},
		onLayerMouseEnter(e) {
			this.hoveredCounter++;
		},
		onLayerMouseLeave(e) {
			this.hoveredCounter--;
		}
	}
}
</script>

<style lang="sass">
	@import "../assets/sass/components/view/viewer"
</style>