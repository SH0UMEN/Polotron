const state = {
    layers: [],
};

const mutations = {
    addLayer(state, layerID) {
        state.layers.push(layerID)
    },
    reset(state) {
        state.layers = []
    },
};

const getters = {
    getLayersList(state) {
        return state.layers
    },
}

export default {
    getters,
    state,
    mutations
}