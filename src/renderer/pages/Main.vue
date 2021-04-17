<template>
	<main>
		<div tabindex="-1"
			 @keydown.90.ctrl.exact="undo"
			 @keydown.89.ctrl.exact="redo"
			 @keydown.90.meta.exact="undo"
			 @keydown.89.meta.exact="redo"
			 class="main-wrapper">
			<viewer></viewer>
			<layers-list-panel v-model="selectedLayer"></layers-list-panel>
		</div>
		<grd-modal></grd-modal>
		<grd-props-modal></grd-props-modal>
		<grd-animation-modal></grd-animation-modal>
		<vector-modal></vector-modal>
		<area-object-modal></area-object-modal>
		<source-list-modal :layer="currentLayer"></source-list-modal>
		<source-modal :layer="sourceModalArguments.layer" :points="sourceModalArguments.points"></source-modal>
		<message-modal></message-modal>
	</main>
</template>

<script>
import AreaObjectModal from "../components/modals/AreaObjectModal";

const electron = require('electron'),
	path = require('path');

import LayersListPanel from "../components/panels/LayersListPanel"
import GrdModal from "../components/modals/GrdModal"
import VectorModal from "../components/modals/VectorModal"
import GrdPropsModal from "../components/modals/GrdPropsModal"
import GrdAnimationModal from "../components/modals/GrdAnimationModal"
import Viewer from "../components/Viewer"
import LayersStore from '../helpers/LayersStore'
import ChangeManager from "../ChangeManager";
import SourceModal from "../components/modals/SourceModal";
import SourceListModal from "../components/modals/SourceListModal";
import CreateSourceCoordinates from "../actions/CreateSourceCoordinates";
import MessageModal from "../components/modals/MessageModal";
import { GRD } from '../helpers/Layers'
import Keys from '../utils/Keys'

export default {
	name: 'MainWindow',
	data() {
		return {
			selectedLayer: 0,
			layerStore: LayersStore.getInstance(),
			sourceModalArguments: {
				points: null,
				layer: null
			}
		}
	},
	components: {
		AreaObjectModal,
		GrdModal,
		GrdPropsModal,
		Viewer,
		LayersListPanel,
		GrdAnimationModal,
		VectorModal,
		SourceModal,
		MessageModal,
		SourceListModal
	},
	methods: {
		undo() {
			ChangeManager.getInstance().undo();
		},
		redo() {
			ChangeManager.getInstance().redo();
		},
	},
	mounted() {
		electron.ipcRenderer.on('openGRD', (event) => {
			this.$modal.show('grd-modal')
		});
		electron.ipcRenderer.on('openGRDAnimation', (event) => {
			this.$modal.show('grd-animation-modal')
		});
		electron.ipcRenderer.on('openVectors', (event) => {
			this.$modal.show('vector-modal')
		});
		electron.ipcRenderer.on('addAreaObject', (event) => {
			this.$modal.show('area-object-modal')
		});
		electron.ipcRenderer.on('addSource', (event) => {
			let layer = this.currentLayer;

			if(layer) {
				let action = new CreateSourceCoordinates(layer)
				action.execute((points) => {
					this.sourceModalArguments.points = points;
					this.sourceModalArguments.layer = layer;

					this.$modal.show('source-modal')
				});
			} else {
				this.$store.commit('setMessage', 'Не выбран ни один слой. Выберите слой в правой панели')
				this.$modal.show('message-modal')
			}
		});

		// electron.ipcRenderer.on('exportAsGRD', (event) => {
		// 	electron.remote.dialog.showSaveDialog({
		// 		filters: [
		// 			{ name: '.grd-матрицы', extensions: ['grd']}
		// 		]
		// 	}, (filename) => {
		// 		let layer = this.layerStore.layers[this.selectedLayer];
		//
		// 		if(filename && layer && layer instanceof GRD) {
		// 			layer.saveAsGRD(filename);
		// 		}
		// 	});
		// });
	},

	computed: {
		currentLayer() {
			return this.layerStore.layers[this.selectedLayer];
		}
	}
}
</script>

<style lang="sass">
@import "../assets/fonts/roboto/roboto.css"
@import "../assets/css/all.css"
@import "../assets/sass/main"
</style>
