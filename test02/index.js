import { IMAGE_LIST } from "./constants/index.js"
import { ImageLoader } from "./ImageLoader.js"

const createImageList = (wrapperElem) => {
    const callbackMap = new Map()
    const docFrag = document.createDocumentFragment()

    const randomLengthList = [100, 200, 300]
    const randomLength = Math.floor(Math.random() * (randomLengthList.length - 1))
    const arr = Array.from({length: randomLengthList[randomLength]}).fill(0)

    arr.forEach((v, i) => {
        const imageLoader = new ImageLoader(IMAGE_LIST[i % 3])
        const elem = imageLoader.preRender(i)
        callbackMap.set(`img-${i}`, imageLoader)
        docFrag.appendChild(elem)
    })

    wrapperElem.appendChild(docFrag)
    return callbackMap
}

window.addEventListener('load', () => {
    const wrapper = document.getElementById('wrapper')
    const header = document.getElementById('header')
    const headerBox = document.getElementById('header-box')

    const imageMap = createImageList(wrapper)

    let options = {
        rootMargin: `-${header.getBoundingClientRect().bottom}px 0px 0px 0px`,
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry
     */
    const onIntersect = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                headerBox.classList.remove('hide')
            } else {
                headerBox.classList.add('hide')
            }
        })
    }
      
    const headerObserver = new IntersectionObserver(onIntersect, options);

    const firstCard = document.querySelector('.card')
    headerObserver.observe(firstCard)

    const imageLazyLoadingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target
                const imgElem = target.getElementsByTagName('img')[0]
                imageMap.get(imgElem.id).render()
                imageLazyLoadingObserver.unobserve(target)
            }
        })
    })

    const cardList = Array.from(document.querySelectorAll('.card'))
    cardList.forEach((elem) => {
        imageLazyLoadingObserver.observe(elem)
    })
})

