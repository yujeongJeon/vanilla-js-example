/**
 * <img
      class="lazy"
      src="https://res.cloudinary.com/drp9iwjqz/image/upload/e_blur:2000,f_auto,q_auto:eco/v1508291830/jeremywagner.me/using-webp-images/tacos-1x.jpg"
      data-src="https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/tacos-2x.jpg"
      data-srcset="https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/tacos-2x.jpg 2x, https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/tacos-1x.jpg 1x"
      width="385"
      height="108"
      alt="Some tacos."
    />
    <img
      class="lazy"
      src="https://res.cloudinary.com/drp9iwjqz/image/upload/e_blur:2000,f_auto,q_auto:eco/v1508210556/jeremywagner.me/using-webp-images/modem-2x.png"
      data-src="https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/modem-2x.png"
      data-srcset="https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/modem-2x.png 2x, https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1508210556/jeremywagner.me/using-webp-images/modem-1x.png 1x"
      width="320"
      height="176"
      alt="A 56k modem."
    />
    <img
      class="lazy"
      src="https://res.cloudinary.com/drp9iwjqz/image/upload/e_blur:2000,f_auto,q_auto:eco/v1509298941/jeremywagner.me/about/st-paul-1x.jpg"
      data-src="https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509298941/jeremywagner.me/about/st-paul-2x.jpg"
      data-srcset="https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509298941/jeremywagner.me/about/st-paul-2x.jpg 2x, https://res.cloudinary.com/drp9iwjqz/image/upload/f_auto,q_auto/v1509298941/jeremywagner.me/about/st-paul-1x.jpg 1x"
      width="400"
      height="267"
      alt="A city skyline."
    />
 */
export class ImageLoader {
    data = {}
    imgElem = null
    /**
     * 
     * @param {{src, width, height, alt}} data
     */
    constructor(data) {
        this.data = data
    }

    render() {
        this.imgElem.src = this.data.src
        this.imgElem.srcset = this.data.srcset
        return card
    }

    preRender() {
        const card = document.createElement('div')
        card.classList.add('card', 'lazy')
        const img = document.createElement('img')
        img.src = this.data.blurredSrc
        img.alt = this.data.alt
        this.imgElem = img
        card.appendChild(img)
        return card
    }
}