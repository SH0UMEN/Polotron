class LayersStore {
    static instance = null;
    layers = {};
    IDCounter = 0;

    static getInstance() {
        if (!LayersStore.instance) {
            LayersStore.instance = new LayersStore();
        }

        return LayersStore.instance;
    }

    addLayer(layer) {
        this.IDCounter += 1;
        this.layers[this.IDCounter] = layer;
        return this.IDCounter;
    }

    deleteLayer(layerID) {
        this.layers[layerID].drawing = false;
        this.layers[layerID] = null;
    }

    getLayerByID(layerID) {
        return this.layers[layerID];
    }
}

export default LayersStore;