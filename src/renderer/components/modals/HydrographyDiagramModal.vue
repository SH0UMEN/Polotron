<template>
	<main-modal @before-open="beforeOpen" title="Просмотреть гидрограф" name="hydrography-diagram-modal">
		<form class="modal__form">
			<div class="modal__form-field">
				<span class="modal__form-field-title">Выберите источник: </span>
				<main-select class="modal__form-field-input" v-model="source" :options="sources"></main-select>
			</div>
		</form>
		<hydrography-diagram :layer="layer" :source="source"></hydrography-diagram>

		<div class="modal__bottom">
			<main-button :filled="true" @click="exportHydrography">
				Экспортировать гидрограф
			</main-button>
		</div>
	</main-modal>
</template>

<script>
	import MainModal from "./MainModal";
	import MainInput from "../ui/MainInput";
	import MainButton from "../ui/Button";
	import MainSelect from "../ui/MainSelect";
	import HydrographyDiagram from "../HydrographyDiagram";
	import {Source} from "../../helpers/Source";
	const electron = require('electron');

	export default {
		name: "HydrographyDiagramModal",
		components: {
			MainModal,
			MainButton,
			MainInput,
			MainSelect,
			HydrographyDiagram
		},
		data() {
			return {
				sources: [],
				source: null
			}
		},
		props: {
			layer: Object
		},
		methods: {
			exportHydrography() {
				electron.remote.dialog.showSaveDialog(
					{
						filters: [
							{ name: '', extensions: ['dat']}
						]
					},
					(filename) => {
						this.layer.getHydrography().export(filename);
						this.$modal.hide('hydrography-diagram-modal');
					});
			},

			beforeOpen() {
				if(this.layer) {
					this.sources = this.layer.getSources().map((el) => {
						return { value: el, label: el.title }
					});
					this.source = null;
					this.source = this.sources[0];
				}
			}
		}
	}
</script>