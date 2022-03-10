export const debounce = (fn, {delay} = {delay: 500}) => {
    let timer = null

    return (...args) => new Promise((resolve, reject) => {
        let canceledTimer = null

        if (timer) {
            clearTimeout(timer)
            timer = null
        }

        timer = setTimeout(() => {
            clearTimeout(canceledTimer)
            fn(...args)
            resolve(true);
            timer = null;
        }, delay)

        canceledTimer = setTimeout(() => {
            resolve(false)
        }, delay)
    })
}


export const getIntersectionArray = (targetList, sourceList, key) => {
    return targetList.filter((targetItem) => sourceList.some((srcItem) => srcItem[key] === targetItem[key]))
}