import { AutoCompleteBox } from "./AutoCompleteBox.js"
import { DeleteButton } from "./DeleteButton.js"
import { SearchDirector } from "./SearchDirector.js"
import { TextBox } from "./TextBox.js"

window.onload = function() {
    const textBox = new TextBox()
    const deleteButton = new DeleteButton()
    const autoCompleleBox = new AutoCompleteBox()
    const searchDirector = new SearchDirector(textBox, deleteButton, autoCompleleBox)

    textBox.render()
    autoCompleleBox.render()
    deleteButton.render()
}