import { createToggleManager } from "./ToggleManager.js"

export class Loading {
    element = null
    autoFrameBox = document.getElementById('auto-frame-box')
    toggleManager = null

    constructor() {
        this.element = Loading.createLoading()
        this.autoFrameBox.appendChild(this.element)
        this.toggleManager = createToggleManager(this.element, 'close')
    }

    static createLoading() {
        const elem = document.createElement('p')
        elem.classList.add('loading', 'close')
        elem.textContent = 'loading...'
        return elem
    }

    show() {
        this.toggleManager.show()
    }

    hide() {
        this.toggleManager.hide()
    }
}