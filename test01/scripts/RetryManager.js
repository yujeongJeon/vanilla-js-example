import { isFunction } from "../utils/index.js"
import { createFetcher } from "./Fetcher.js"

export class RetryManager {
    cnt = 0

    async retry({url, onError}) {
        try {
            if (this.isExceedTwice) {
                this.cnt = 0
                throw new Error('Number of Retry Calls Exceeds 2.')
            }
            this.cnt++
            const fetcher = createFetcher()
            const results = await fetcher.get({url})
            return results
        } catch(e) {
            if (!this.isExceedTwice) {
                this.retry({url, onError})
                return
            }
            isFunction(onError) && onError()
        }
    }

    get isExceedTwice() {
        return this.cnt > 1
    }
}

export class TimeoutError extends Error {
    constructor(message) {
        super(message)
    }
}