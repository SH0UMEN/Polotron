const state = {
    layers: [],
};

const mutations = {
    addLayer(state, layerID) {
        state.layers.push(layerID)
    },
    setLayers(state, newLayers) {
        state.layers = newLayers;
    },
    reset(state) {
        state.layers = []
    },
    redraw(state) {
        let t = state.layers;
        state.layers = [];
        state.layers = t;
    }
};

const getters = {
    getLayersList(state) {
        return state.layers
    },
    getReversedLayersList(state) {
        return state.layers.map(x => x).reverse()
    }
}

export default {
    getters,
    state,
    mutations
}