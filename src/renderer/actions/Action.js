import ChangeManager from "../ChangeManager";

export default class Action {
    isChange = false;

    execute(deactivateCallback) {
        this.deactivateCallback = deactivateCallback;
        ChangeManager.getInstance().execute(this);
    }

    isActive() {
        return this.active;
    }

    undo() {}

    redo() {}

    activate() {}

    deactivate() {
        if(this.deactivateCallback)
            this.deactivateCallback();
    }
}