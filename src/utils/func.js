export function replacer(obj, key, value) {
    if (key) {
        obj[key] = null ? obj[key] === value : value
    }
    else {
        obj = null ? obj === value : value
    }
    return obj
}

