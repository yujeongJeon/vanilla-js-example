export class AutoCompleteBox {
    list = []

    search(value) {
        console.log('자동완성 단어 리스트 검색')
    }

    emptyList() {
        console.log('리스트 비우기')
        this.list = []
    }
}