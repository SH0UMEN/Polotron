import LayersStore from '../../helpers/LayersStore'

const state = {
    layers: [],
    selectedLayer: 0,
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
        state.layers.push('0');
        state.layers.pop();
    },
    selectLayer(state, layerID) {
        state.selectedLayer = layerID;
    },
    removeLayer(state, layerID) {
        let store = LayersStore.getInstance();
        store.layers[layerID].destroy();
        store.deleteLayer(layerID);
        state.layers.splice(state.layers.indexOf(layerID), 1);
    },
};

const actions = {
};

const getters = {
    getLayersList(state) {
        return state.layers;
    },
}

export default {
    getters,
    state,
    mutations,
    actions
}