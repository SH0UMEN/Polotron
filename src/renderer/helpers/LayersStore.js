class LayersStore {
    static instance = null;
    layers = []

    static getInstance() {
        if (!LayersStore.instance) {
            LayersStore.instance = new LayersStore();
        }

        return LayersStore.instance;
    }

    addLayer(layer) {
        this.layers.push(layer)
    }
}

export default LayersStore;