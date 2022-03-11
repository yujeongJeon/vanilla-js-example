export class Collegue {
    mediator = null

    change(self, {type}) {
        this.mediator.change(self, {type})
    }
}