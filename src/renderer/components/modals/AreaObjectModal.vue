<template>
	<main-modal title="Создание площадного объекта" name="area-object-modal">
		<h3 v-if="grdLayers.length == 0">Не загружен ни один файл рельефа!</h3>
		<form v-else class="modal__form">
			<div class="modal__form-field">
				<span class="modal__form-field-title">Выберите слой: </span>
				<main-select label="title" v-model='selectedLayer' :options="grdLayers"></main-select>
			</div>
			<div class="modal__form-field">
				<span class="modal__form-field-title">Введите высоту площадного<br>объекта: </span>
				<main-input v-model="newZ" type="number"></main-input>
			</div>
		</form>
		<div v-if="grdLayers.length != 0" class="modal__bottom">
			<main-button :filled="true" @click="setPoints" :disabled="!isValid">
				Задать координаты
			</main-button>
		</div>
	</main-modal>
</template>

<script>
import MainModal from "./MainModal";
import MainInput from "../ui/MainInput";
import MainButton from "../ui/Button";
import MainSelect from "../ui/MainSelect";
import LayersStore from "../../helpers/LayersStore"
import CreateAreaObject from "../../actions/CreateAreaObject"
import ChangeManager from '../../ChangeManager';
import {GRD} from '../../helpers/Layers';

export default {
	name: "AreaObjectModal",
	components: {MainInput, MainModal, MainButton, MainSelect},
	data() {
		return {
			newZ: 0,
			selectedLayer: null,
			layersStore: LayersStore.getInstance()
		}
	},

	methods: {
		setPoints(event) {
			event.preventDefault();
			event.stopPropagation();
			let layer = this.layersStore.getLayerByID(this.selectedLayer.id);
			let action = new CreateAreaObject(layer.canvas, layer, this.newZ);
			this.$modal.hide('area-object-modal');
			this.selectedLayer = null;
			action.execute();
		}
	},

	computed: {
		isValid() {
			return !!this.selectedLayer;
		},

		layers() {
			return this.$store.getters.getLayersList;
		},

		grdLayers() {
			let res = [], layerID, layer, newLayer, layers = this.layers;

			for(layerID of layers) {
				layer = this.layersStore.layers[layerID];
				if(layer instanceof GRD) {
					newLayer = { id: layerID, title: layer.title }
					res.push(newLayer);
				}
			}

			return res;
		}
	},
}
</script>

<style scoped>

</style>