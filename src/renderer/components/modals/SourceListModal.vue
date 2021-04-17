<template>
	<main-modal @before-open="beforeOpen" title="Список источников" name="source-list-modal">
		<h3 v-if="sources.length == 0">Слой "{{ this.layer ? this.layer.title : '' }}" не содержит источников</h3>
		<div v-else class="source__list">
			<div class="source__list-item" v-for="source in sources">
				<span>{{ source.getTitle() }}</span>
				<main-button title='Удалить источник' @click="removeSource(source)" class="modal__close">&times;</main-button>
			</div>
		</div>
		<div class="modal__bottom" v-if="sources.length > 0">
			<main-button :filled="true" @click="exportSources">
				Экспортировать
			</main-button>
		</div>
	</main-modal>
</template>

<script>
import MainModal from "./MainModal";
import MainButton from "../ui/Button";
import MainSelect from "../ui/MainSelect";
import {Source} from "../../helpers/Source";

const electron = require('electron')

export default {
	name: "SourceListModal",
	components: {MainModal, MainButton, MainSelect},

	props: {
		layer: {
			type: Object,
			default: () => {}
		}
	},

	data() {
		return {
			sources: []
		}
	},

	methods: {
		removeSource(source) {
			this.layer.removeSource(source);
			this.sources = this.layer.getSources();
		},
		beforeOpen(event) {
			this.sources = this.layer ? this.layer.getSources() : [];
		},
		exportSources() {
			electron.remote.dialog.showSaveDialog(
	{
				filters: [
					{ name: '', extensions: ['dat']}
				]
			},
	(filename) => {
				Source.export(filename, this.sources);
				this.$modal.hide('source-list-modal');
			});
		}
	}
}
</script>

<style lang="sass">
	.source__list-item
		display: flex
		justify-content: space-between
</style>