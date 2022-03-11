import { Collegue } from "./Collegue.js"

export class DeleteButton extends Collegue {
    isShow = false

    toggleShow(value) {
        console.log('삭제버튼 토글 : ', value)
        if (!value) {
            this.isShow = false
            return
        }
        this.isShow = true
    }
    
    onClick() {
        this.change(this)
        this.isShow = false
    }
}