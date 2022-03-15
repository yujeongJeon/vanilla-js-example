export class ImageLoader {
    data = {}
    imgElem = null
    
    constructor(data) {
        this.data = data
    }

    async render() {
      await new Promise((resolve) => setTimeout(() => resolve(1), 3000)) // 확인을 위한 sleep
      const rAF = requestAnimationFrame(() => {
        this.imgElem.src = this.data.src
        this.imgElem.srcset = this.data.srcset
      })
    }

    preRender(index) {
        const card = document.createElement('div')
        card.classList.add('card', 'lazy')
        const img = document.createElement('img')
        img.src = this.data.blurredSrc
        img.alt = this.data.alt
        img.id = `img-${index}`
        this.imgElem = img
        card.appendChild(img)
        return card
    }
}