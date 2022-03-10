import { debounce, getIntersectionArray } from "../utils/index.js"
import { createFetcher } from "./Fetcher.js"

window.onload = function() {
    const input = document.getElementById("input")
    const autoFrameBox = document.getElementById('auto-frame-box')
    const container = document.getElementById('container')
    const deleteBtn = document.getElementById('del-btn')

    document.body.addEventListener('click', () => {
        autoFrameBox.classList.add('close')
    })

    deleteBtn.addEventListener('click', () => {
        document.getElementById("input").value = ''
        appendAutoCompleteList([])
    })

    input.addEventListener('click', (e) => {
        e.stopPropagation()
        autoFrameBox.classList.remove('close')
    })

    autoFrameBox.addEventListener('click', (e) => {
        e.stopPropagation()
        // 하위 요소들에 이벤트 리스너 등록
    })

    const appendAutoCompleteList = (list) => {
        const fragmentBox = document.createDocumentFragment()

        list.forEach(({name: keyword}) => {
            const elem = document.createElement('li')
            elem.classList.add('item')
            elem.textContent = keyword
            fragmentBox.appendChild(elem)
        })
        container.innerHTML = '';
        container.appendChild(fragmentBox)
    }

    const getAutoCompleteListByKeyword = debounce(async (keyword) => {
        try {
            if (!keyword) {
                appendAutoCompleteList([])
                return
            }

            const lowerCaseKeyword = keyword.toLowerCase()

            const fetcher = createFetcher()
            const results = await fetcher.get({url: 'https://swapi.dev/api/people', onError: (error) => {
                console.log(error.message)
            }})
            const autoCompleteList = results
                .map(({url, name}) => ({url, name : name.toLowerCase()}))
                .filter(({name}) => name.includes(lowerCaseKeyword))

            appendAutoCompleteList(getIntersectionArray(results, autoCompleteList, 'url'))
        } catch (e) {
            console.error(e)
        }
    }, {
        delay: 300,
    })

    input.addEventListener('input', (e) => {
        getAutoCompleteListByKeyword(e.target.value)
    })
}