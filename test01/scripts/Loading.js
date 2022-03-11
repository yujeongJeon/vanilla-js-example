export class Loading {
    element = null
    autoFrameBox = document.getElementById('auto-frame-box')

    constructor() {
        this.element = Loading.createLoading()
        this.autoFrameBox.appendChild(this.element)
    }

    static createLoading() {
        const elem = document.createElement('p')
        elem.classList.add('loading')
        elem.textContent = 'loading...'
        return elem
    }

    show() {
        this.element.classList.add('visible')
    }

    hide() {
        this.element.classList.remove('visible')
    }
}