class ToggleManager {
    toggleClassName = ''
    element = null

    constructor(element, toggleClassName) {
        this.toggleClassName = toggleClassName
        this.element = element
    }

    show() {
        this.element.classList.remove(this.toggleClassName)
    }

    hide() {
        this.element.classList.add(this.toggleClassName)
    }
}

export const createToggleManager = (element, toggleClassName) => new ToggleManager(element, toggleClassName)