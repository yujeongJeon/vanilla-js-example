import { Collegue } from "./Collegue.js"

export class TextBox extends Collegue {
    value = ''
    input = document.getElementById("input")

    render() {
        input.addEventListener('input', (e) => {
            this.onChange(e.target.value)
        })
        input.addEventListener('click', (e) => {
            e.stopPropagation()
            this.change(this, {type: 'click'})
        })
    }
    onChange(value) {
        this.value = value
        this.change(this, {type: 'change'})
    }
    empty() {
        input.value = ''
        this.value = ''
    }
}