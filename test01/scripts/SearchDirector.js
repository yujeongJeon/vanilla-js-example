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

    change(instance) {
        if (instance instanceof TextBox) {
            console.log('textbox의 변경!')
            this.autoComplete.search(instance.value)
            this.deleteButton.toggleShow(instance.value)
        }
        if (instance instanceof DeleteButton) {
            console.log('deleteButton의 클릭')
            this.autoComplete.emptyList()
            this.textBox.empty()
        }
    }
}