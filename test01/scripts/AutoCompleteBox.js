import { debounce, getIntersectionArray } from "../utils/index.js"
import { createFetcher } from "./Fetcher.js"
import { RetryManager } from "./RetryManager.js"
import { createToggleManager } from "./ToggleManager.js"

export class AutoCompleteBox {
    container = document.getElementById('container')
    autoFrameBox = document.getElementById('auto-frame-box')
    detailBox = document.getElementById('detail-box')

    fetcher = createFetcher()

    loadingText = null

    prevCall = null

    frameBoxToggleManager = null

    searchRetryManager = null

    constructor(loadingText) {
        this.loadingText = loadingText
        this.frameBoxToggleManager = createToggleManager(this.autoFrameBox, 'close')
        this.searchRetryManager = new RetryManager()
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
        this.frameBoxToggleManager.show()
    }

    hide() {
        this.frameBoxToggleManager.hide()
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

            const {results} = await this.fetcher.get({
                url: 'https://swapi.dev/api/people', 
                onBefore: () => {
                    this.loadingText.show()
                    this.prevCall = this.fetcher
                },
                onSuccess: () => {
                    this.loadingText.hide()
                    this.prevCall = null
                }
            })
            const autoCompleteList = this.filterByKeyword(results, lowerCaseKeyword)
            this.appendAutoCompleteList(getIntersectionArray(results, autoCompleteList, 'url'))
        } catch (e) {
            if (e.name === 'AbortError') {
                this.appendAutoCompleteList([])
                return
            }
            this.searchRetryManager.retry({
                url: 'https://swapi.dev/api/people', 
                onBefore: () => {}, 
                onSuccess: () => {
                    this.loadingText.hide()
                    this.prevCall = null
                },
                onError: () => {
                    this.loadingText.hide()
                    window.alert('검색 중 오류가 발생했습니다.')
                }
            })
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

    cancelCallHistory() {
        this.fetcher.cancel()
        this.fetcher = createFetcher()
        this.loadingText.hide()
    }
}