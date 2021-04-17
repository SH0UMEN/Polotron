<template>
	<main-modal title="Задание координат источника" name="source-modal">
		<form class="modal__form">
			<div class="modal__form-field">
				<span class="modal__form-field-title">Название источника: </span>
				<main-input v-model="sourceName"></main-input>
			</div>
			<div class="modal__form-field">
				<span class="modal__form-field-title">Выберите наклон: </span>
				<main-select v-model='angle' :options="angles"></main-select>
			</div>
		</form>
		<div class="modal__bottom">
			<main-button :filled="true" @click="saveSource" :disabled="angle == null || sourceName == null">
				Сохранить
			</main-button>
		</div>
	</main-modal>
</template>

<script>
	import MainModal from "./MainModal";
	import MainInput from "../ui/MainInput";
	import MainButton from "../ui/Button";
	import MainSelect from "../ui/MainSelect";
	import LayersStore from "../../helpers/LayersStore";
	import {GRD} from "../../helpers/Layers";
	import {Source} from "../../helpers/Source";

	export default {
		name: "SourceModal",
		components: {MainInput, MainModal, MainButton, MainSelect},

		props: {
			points: {
				type: Array,
				default: () => []
			},
			layer: {
				type: Object,
				default: () => {}
			}
		},

		data() {
			return {
				sourceName: '',
				selectedLayer: null,
				angles: [
					{ label: 'Наклон влево', value: 0.5 },
					{ label: 'Наклон вправо', value: -0.5 }
				],
				angle: null,
				layersStore: LayersStore.getInstance()
			}
		},

		mounted() {
			this.angle = this.angles[0];
		},

		methods: {
			saveSource() {
				var source = new Source(this.sourceName, this.points, this.angle.value);
				this.layer.addSource(source);
				this.$modal.hide('source-modal')
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