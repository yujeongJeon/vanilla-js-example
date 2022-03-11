import { debounce, getIntersectionArray } from "../utils/index.js"
import { createFetcher } from "./Fetcher.js"

export class AutoCompleteBox {
    container = document.getElementById('container')
    autoFrameBox = document.getElementById('auto-frame-box')
    detailBox = document.getElementById('detail-box')

    fetcher = createFetcher()

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

    appendAutoCompleteList(list) {
        const fragmentBox = document.createDocumentFragment()

        list.forEach(({name: keyword, url}) => {
            const elem = document.createElement('li')
            elem.classList.add('item')
            elem.textContent = keyword
            elem.id = url
            fragmentBox.appendChild(elem)
        })
        this.container.innerHTML = '';
        this.container.appendChild(fragmentBox)
    }

    filterByKeyword(list, keyword) {
        return list
        .map(({url, name}) => ({url, name : name.toLowerCase()}))
        .filter(({name}) => name.includes(keyword))
    }

    debounceSearch = debounce(async (keyword) => {
        console.log(keyword)
        try {
            if (!keyword) {
                appendAutoCompleteList([])
                return
            }

            const lowerCaseKeyword = keyword.toLowerCase()

            const {results} = await this.fetcher.get({url: 'https://swapi.dev/api/people', onError: (error) => {
                console.log(error.message)
            }})
            const autoCompleteList = this.filterByKeyword(results, lowerCaseKeyword)

            this.appendAutoCompleteList(getIntersectionArray(results, autoCompleteList, 'url'))
        } catch (e) {
            console.error(e)
        }
    }, {
        delay: 300,
    })

    search(keyword) {
        if (!keyword) {
            this.emptyList()
            return
        }
        this.debounceSearch(keyword)
    }

    emptyList() {
        this.container.innerHTML = '';
    }
}