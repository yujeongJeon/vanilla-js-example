import { DeleteButton } from "./DeleteButton.js";
import { TextBox } from "./TextBox.js";

export class SearchDirector {
    textBox = null
    deleteButton = null
    autoComplete = null

    constructor(textBox, deleteButton, autoComplete) {
        this.textBox = textBox
        this.deleteButton = deleteButton
        this.autoComplete = autoComplete
        this.register()
    }

    register() {
        this.textBox.mediator = this
        this.deleteButton.mediator = this
        this.autoComplete.mediator = this
    }

    change(instance, {type}) {
        if (instance instanceof TextBox) {
            if (type === 'change') {
                this.autoComplete.search(instance.value)
                this.deleteButton.toggleShow(instance.value)
            } else if (type === 'click') {
                this.autoComplete.show()
            }
        }
        if (instance instanceof DeleteButton) {
            this.autoComplete.emptyList()
            this.textBox.empty()
        }
    }
}