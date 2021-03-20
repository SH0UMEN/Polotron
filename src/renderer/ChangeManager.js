class ChangeManager {
	static instance = null;
	pointer = -1;
	maxHistoryLength = 100;
	history = [];

	static getInstance() {
		if (!ChangeManager.instance) {
			ChangeManager.instance = new ChangeManager();
		}

		return ChangeManager.instance;
	}

	execute(action) {
		action.activate();

		if(action.isChange) {
			if(this.history.length == this.maxHistoryLength) {
				this.history.shift();
				this.pointer--;
			}

			this.history = this.history.slice(0, this.pointer+1);
			this.history.push(action);
			this.pointer++;
		}
	}

	undo() {
		if(this.pointer != -1) {
			var current = this.history[this.pointer];

			if(!current.isActive()) {
				current.undo();
				this.pointer--;
			}
		}
	}

	redo() {
		if(this.pointer != this.history.length - 1) {
			var current = this.history[this.pointer];

			if(current == null || !current.isActive()) {
				this.pointer++;
				this.history[this.pointer].redo();
			}
		}
	}
}

export default ChangeManager;