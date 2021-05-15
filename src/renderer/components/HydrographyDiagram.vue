<template>
	<div class="hydrography-diagram">
		<div v-if="showPositive"
			 class="hydrography-diagram__container"
			 :style="{ height: positiveTop > abs(negativeBottom) ? '100px' : ((positiveTop/abs(negativeBottom))*100)+'px' }">
			<div v-for="value in positive"
				 :title="value"
				 class="hydrography-diagram__column"
				 :style="{ height: ((value/positiveTop)*100)+'%' }">
			</div>
		</div>
		<div v-if="showNegative"
			 class="hydrography-diagram__container hydrography-diagram__container_negative"
			 :style="{ height: abs(negativeBottom) > positiveTop ? '100px' : ((abs(negativeBottom)/positiveTop)*100)+'px' }">
			<div v-for="value in negative"
				 :title="value"
				 class="hydrography-diagram__column hydrography-diagram__column_negative"
				 :style="{ height: ((value/negativeBottom)*100)+'%' }">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "HydrographyDiagram",
	props: {
		layer: Object,
		source: Object
	},
	data() {
		return {
			values: [],
			positive: [],
			negative: []
		}
	},
	computed: {
		negativeBottom() {
			return Math.min(...this.negative);
		},
		positiveTop() {
			return Math.max(...this.positive);
		},
		showNegative() {
			return !this.negative.every((el) => el == 0);
		},
		showPositive() {
			return !this.positive.every((el) => el == 0);
		}
	},
	mounted() {
		this.draw(this.source);
	},
	watch: {
		source(value) {
			this.draw(value)
		}
	},
	methods: {
		draw(source) {
			if(this.layer && source) {
				var index = this.layer.getSources().indexOf(source.value);

				if(this.layer.getHydrography()) {
					this.values = this.layer.getHydrography().getSpendValues()[index];
					this.positive = this.values.map((el) => el > 0 ? el : 0);
					this.negative = this.values.map((el) => el < 0 ? el : 0);
				}
			}
		},
		abs(number) {
			return Math.abs(number);
		}
	}
}
</script>

<style lang="sass" src="../assets/sass/hydrography.sass">
</style>