const state = {
	message: ''
}

const mutations = {
	setMessage(state, message) {
		state.message = message;
	}
};

const getters = {
	getMessage(state) {
		return state.message;
	},
}

export default {
	getters,
	state,
	mutations,
}