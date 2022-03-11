import { isFunction } from "../utils/index.js"

class Fetcher {
    controller = null

    constructor() {
        this.controller = new AbortController()
    }

    async get({url, onError, onBefore, onSuccess}) {
        isFunction(onBefore) && onBefore()
        const result = await fetch(url, {signal: this.controller.signal})
        .then((response) => {
            const res = response.json()
            isFunction(onSuccess) && onSuccess(res)
            return res
        })
        .catch(function(e) {
            isFunction(onError) && onError(e)
            throw e
        })
        return result
    }

    cancel() {
        this.controller.abort()
    }
}

export const createFetcher = () => new Fetcher()