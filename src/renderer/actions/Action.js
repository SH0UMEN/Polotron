import ChangeManager from "../ChangeManager";

export default class Action {
    isChange = false;

    execute() {
        ChangeManager.getInstance().execute(this);
    }

    undo() {}

    redo() {}

    activate() {}

    deactivate() {}
}