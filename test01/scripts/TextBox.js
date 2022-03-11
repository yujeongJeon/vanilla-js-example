import { Collegue } from "./Collegue.js"

export class TextBox extends Collegue {
    value = ''
    onChange(value) {
        this.value = value
        this.change(this)
    }
    empty() {
        console.log('인풋 비우기')
        this.value = ''
    }
}