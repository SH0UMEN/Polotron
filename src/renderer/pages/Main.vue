<template>
	<main>
		<viewer></viewer>
		<layers-list-panel v-model="selectedLayer"></layers-list-panel>
		<grd-modal></grd-modal>
		<grd-props-modal></grd-props-modal>
		<grd-animation-modal></grd-animation-modal>
		<vector-modal></vector-modal>
		<area-object-modal></area-object-modal>
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
import { GRD } from '../helpers/Layers'

export default {
	name: 'MainWindow',
	data() {
		return {
			selectedLayer: 0,
			layerStore: LayersStore.getInstance()
		}
	},
	components: {
		AreaObjectModal,
		GrdModal,
		GrdPropsModal,
		Viewer,
		LayersListPanel,
		GrdAnimationModal,
		VectorModal
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
		electron.ipcRenderer.on('exportAsGRD', (event) => {
			electron.remote.dialog.showSaveDialog({
				filters: [
					{ name: '.grd-матрицы', extensions: ['grd']}
				]
			}, (filename) => {
				let layer = this.layerStore.layers[this.selectedLayer];

				if(filename && layer && layer instanceof GRD) {
					layer.saveAsGRD(filename);
				}
			});
		});
	},
}
</script>

<style lang="sass">
//@import "../assets/fonts/roboto/roboto.css"
@import "../assets/css/all.css"
@import "../assets/sass/main"
</style>
