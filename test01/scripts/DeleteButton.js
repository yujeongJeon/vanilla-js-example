import { Collegue } from "./Collegue.js"
import { createToggleManager } from "./ToggleManager.js"

export class DeleteButton extends Collegue {
    deleteBtn = document.getElementById('del-btn')
    btnToggleManager = null

    constructor() {
        super()
        this.btnToggleManager = createToggleManager(this.deleteBtn, 'invisible')
    }

    render() {
        this.deleteBtn.addEventListener('click', () => {
            this.onClick()
        })
    }

    toggleShow(value) {
        if (!value) {
            this.btnToggleManager.hide()
            return
        }
        this.btnToggleManager.show()
    }
    
    onClick() {
        this.change(this, {type: 'click'})
        this.btnToggleManager.hide()
    }
}