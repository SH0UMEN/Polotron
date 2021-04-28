<template>
	<div v-if="coordinates" class="point-coordinates">
		x: {{ coordinates[0] }}; y: {{ coordinates[1] }}; z: {{ coordinates[2] }}
	</div>
</template>

<script>
export default {
	name: "PointCoordinatesPanel",
	props: {
		coordinates: {
			type: Array
		}
	}
}
</script>

<style lang="sass" src="../../assets/sass/components/panels/point-coordinates-panel.sass"></style>