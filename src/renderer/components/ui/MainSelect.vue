<template>
	<v-select class="main-select" :searchable='false' :clearable="false"
	          :options='options' :label="label" v-model="tValue"></v-select>
</template>

<script>
	import VSelect from 'vue-select'

	export default {
		name: 'Select',
		components: {VSelect},
		props: {
			label: {
				type: String,
				default: 'label'
			},
			options: {
				type: Array,
				default: () => []
			},
			value: {
				type: Object,
				default: null
			}
		},

		computed: {
			tValue: {
				get() {
					return this.value;
				},
				set(val) {
					this.$emit('input', val);
				}
			}
		}
	}
</script>

<style lang="sass">
	@import "../../assets/sass/ui/select"
</style>