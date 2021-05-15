<template>
	<main-modal @before-open="beforeOpen" title="Построение гидрографа" name="hydrography-modal">
		<form action="" class="modal__form">
			<div class="modal__form-field">
				<span class="modal__form-field-title">Шаг записи состояний (с): </span>
				<main-input class="modal__form-field-input" type="number" v-model="step"></main-input>
			</div>

			<div class="modal__form-field">
				<span class="modal__form-field-title">Скорость для всех источников (м/с): </span>
				<main-input type="number" class="modal__form-field-input" v-model="speed"></main-input>
			</div>

			<div class="modal__form-field">
				<span class="modal__form-field-title">Кол-во источников: </span>
				<main-input type="number" class="modal__form-field-input" v-model="count"></main-input>
			</div>

			<div class="modal__form-field">
				<span class="modal__form-field-title">Время работы гидрографа (в сутках): </span>
				<main-input type="number" class="modal__form-field-input" v-model="workingTime"></main-input>
			</div>

			<div class="modal__form-field">
				<span class="modal__form-field-title">Расход каждого источника в день (в столбик): </span>
				<main-input type="textarea" class="modal__form-field-input" v-model="spend"></main-input>
			</div>
		</form>

		<div class="modal__bottom">
			<main-button :disabled="!isValid" :filled="true" @click="save">
				Сохранить
			</main-button>
		</div>
	</main-modal>
</template>

<script>

import MainModal from "./MainModal"
import MainInput from "../ui/MainInput"
import FileInput from "../ui/FileInput"
import MainButton from "../ui/Button"
import Hydrography from "../../helpers/Hydrography"

export default {
	name: "HydrographModal",
	components: {
		MainModal,
		MainInput,
		MainButton,
		FileInput
	},
	props: {
		layer: Object
	},
	data() {
		return {
			step: 0,
			speed: 0,
			count: 0,
			workingTime: 0,
			spend: ''
		}
	},
	computed: {
		isValid() {
			return this.spend.split('\n').length == this.count*this.workingTime;
		}
	},
	methods: {
		save() {
			var spendValues = [];
			var spendArray = this.spend.split('\n').map((el) => parseFloat(el));

			for(var i = 0; i < this.count; i++)
				spendValues.push(spendArray.splice(0, this.workingTime));

			this.layer.setHydrography(new Hydrography(this.step, this.speed, this.count, this.workingTime, spendValues))
			this.$modal.hide('hydrography-modal');
		},

		beforeOpen() {
			this.speed = 0;
			this.workingTime = 0;
			this.step = 0;
			this.spend = '';

			if(this.layer && this.layer.isGRD())
				this.count = this.layer.getSources().length;
		}
	}
}
</script>

<style scoped>

</style>