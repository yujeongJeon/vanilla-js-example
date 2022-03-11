import { AutoCompleteBox } from "./AutoCompleteBox.js"
import { DeleteButton } from "./DeleteButton.js"
import { Loading } from "./Loading.js"
import { SearchDirector } from "./SearchDirector.js"
import { TextBox } from "./TextBox.js"

window.onload = function() {
    const textBox = new TextBox()
    const deleteButton = new DeleteButton()
    const loadingText = new Loading()
    const autoCompleleBox = new AutoCompleteBox(loadingText)
    const searchDirector = new SearchDirector(textBox, deleteButton, autoCompleleBox)

    textBox.render()
    autoCompleleBox.render()
    deleteButton.render()
}