class Fetcher {
    controller = null

    constructor() {
        this.controller = new AbortController()
    }

    async get({url, onError}) {
        const result = await fetch(url, {signal: this.controller.signal})
        .then((response) => response.json())
        .catch(function(e) {
            onError(e)
            throw e
        })
        return result.results
    }

    cancel() {
        this.controller.abort()
    }
}

export const createFetcher = () => new Fetcher()