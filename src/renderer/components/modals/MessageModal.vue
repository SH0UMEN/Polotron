<template>
	<main-modal title="Уведомление" name="message-modal">
		<div class="message-modal__message">{{ message }}</div>
	</main-modal>
</template>

<script>
import MainModal from "./MainModal";
export default {
	name: "MessageModal",
	components: {
		MainModal
	},
	computed: {
		message() {
			return this.$store.getters.getMessage;
		}
	}
}
</script>

<style lang="sass" scoped>
	.message-modal__message
		padding-bottom: 20px
		font-weight: 500
		font-size: 16px
</style>