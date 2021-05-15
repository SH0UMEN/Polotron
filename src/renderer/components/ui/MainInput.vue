<template>
    <label class="main-input">
		<textarea v-if="type == 'textarea'" class="main-input__input" :placeholder="placeholder"
				  :type="type" v-model="tValue" @input="input"></textarea>
        <input v-else step="any" class="main-input__input" :placeholder="placeholder"
               :type="type" v-model="tValue" @input="input">
    </label>
</template>

<script>
    export default {
        name: "MainInput",
        props: {
            placeholder: {
                type: String,
                default: ""
            },
            type: {
                type: String,
                default: 'text'
            },
            value: {
                required: true,
                type: [String, Number],
            },
			disabled: Boolean
        },
        data() {
            return {
                tValue: this.value,
            }
        },
        watch: {
            value(value) {
                this.tValue = value
            }
        },
        methods: {
            input(e) {
                this.$emit('input', this.type == "number" ? parseFloat(this.tValue) : this.tValue)
            }
        }
    }
</script>

<style lang="sass">
    @import "../../assets/sass/ui/main-input"
</style>