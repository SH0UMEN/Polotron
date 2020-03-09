const state = {
    layers: []
};

const mutations = {
    addLayer(state, layer) {
        state.layers.push(layer)
    },
    reset(state) {
        state.layers = []
    }
};

const getters = {
    getLayersList(state) {
        return state.layers
    }
}

export default {
    getters,
    state,
    mutations
}