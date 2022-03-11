import { debounce, getIntersectionArray } from "../utils/index.js"
import { createFetcher } from "./Fetcher.js"

export class AutoCompleteBox {
    container = document.getElementById('container')
    autoFrameBox = document.getElementById('auto-frame-box')
    detailBox = document.getElementById('detail-box')

    fetcher = createFetcher()

    loadingText = null

    prevCall = null

    constructor(loadingText) {
        this.loadingText = loadingText
    }

    render() {
        document.body.addEventListener('click', () => {
            this.hide()
        })
        this.autoFrameBox.addEventListener('click', async (e) => {
            e.stopPropagation()
            // 하위 요소들에 이벤트 리스너 등록
            if (e.target.className === 'item') {
                const url =  e.target.id
                const results = await this.fetcher.get({url, onError: () => {}})
                this.detailBox.innerHTML = ''
                this.detailBox.textContent = JSON.stringify(results)
            }
        })
    }

    show() {
        this.autoFrameBox.classList.remove('close')
    }

    hide() {
        this.autoFrameBox.classList.add('close')
    }

    clearContainer() {
        this.container.innerHTML = '';
    }

    appendAutoCompleteList(list) {
        const fragmentBox = document.createDocumentFragment()

        list.forEach(({name: keyword, url}) => {
            const elem = document.createElement('li')
            elem.classList.add('item')
            elem.textContent = keyword
            elem.id = url
            fragmentBox.appendChild(elem)
        })
        this.container.appendChild(fragmentBox)
    }

    filterByKeyword(list, keyword) {
        return list
        .map(({url, name}) => ({url, name : name.toLowerCase()}))
        .filter(({name}) => name.includes(keyword))
    }
    
    debounceSearch = debounce(async (keyword) => {
        try {
            if (this.prevCall) {
                this.prevCall.cancel()
                this.prevCall = null
                this.fetcher = createFetcher()
            }
            this.clearContainer()

            if (!keyword || keyword.length < 1) {
                this.loadingText.hide()
                setTimeout(() => this.appendAutoCompleteList([]), 0)
                return
            }

            const lowerCaseKeyword = keyword.toLowerCase()

            this.loadingText.show()
            this.prevCall = this.fetcher

            const {results} = await this.fetcher.get({url: 'https://swapi.dev/api/people'})
            const autoCompleteList = this.filterByKeyword(results, lowerCaseKeyword)

            this.loadingText.hide()
            this.prevCall = null

            this.appendAutoCompleteList(getIntersectionArray(results, autoCompleteList, 'url'))
        } catch (e) {
            if (e.name === 'AbortError') {
                this.appendAutoCompleteList([])
            }
            // TODO : ERROR HANDLING
        }
    }, {
        delay: 300,
    })

    search(keyword) {
        this.debounceSearch(keyword)
    }

    emptyList() {
        this.container.innerHTML = '';
    }
}