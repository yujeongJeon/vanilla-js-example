import { Collegue } from "./Collegue.js"

export class DeleteButton extends Collegue {
    deleteBtn = document.getElementById('del-btn')

    render() {
        this.deleteBtn.addEventListener('click', () => {
            this.onClick()
        })
    }

    toggleShow(value) {
        if (!value) {
            this.deleteBtn.classList.add('invisible')
            return
        }
        this.deleteBtn.classList.remove('invisible')
    }
    
    onClick() {
        this.change(this, {type: 'click'})
        this.deleteBtn.classList.add('invisible')
    }
}