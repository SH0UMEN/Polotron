const state = {
    layers: [],
    selectedLayer: undefined,
};

const mutations = {
    addLayer(state, layerID) {
        state.layers.unshift(layerID)
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
    },
    selectLayer(state, layerID) {
        state.selectedLayer = layerID;
    },
    removeLayer(state, layerID) {
        state.layers.splice(state.layers.indexOf(layerID), 1);
    },
};

const actions = {
};

const getters = {
    getLayersList(state) {
        return state.layers
    },
    getReversedLayersList(state) {
        return state.layers.map(x => x).reverse()
    },
}

export default {
    getters,
    state,
    mutations,
    actions
}