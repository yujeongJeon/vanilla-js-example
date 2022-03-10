import { debounce, getIntersectionArray } from "../utils/index.js"
import { createFetcher } from "./Fetcher.js"

window.onload = function() {
    const input = document.getElementById("input")
    const autoFrameBox = document.getElementById('auto-frame-box')
    const container = document.getElementById('container')
    input.addEventListener('focus', (e) => {
        autoFrameBox.classList.toggle('close')
    })
    
    input.addEventListener('blur', (e)=> {
        autoFrameBox.classList.toggle('close')
    })

    const appendAutoCompleteList = (list) => {
        const fragmentBox = document.createDocumentFragment()

        list.forEach(({name: keyword}) => {
            const elem = document.createElement('li')
            elem.textContent = keyword
            fragmentBox.appendChild(elem)
        })
        container.innerHTML = '';
        container.appendChild(fragmentBox)
    }

    const getAutoCompleteList = debounce(async (keyword) => {
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

    input.addEventListener('keyup', (e) => {
        getAutoCompleteList(e.target.value)
    })
}