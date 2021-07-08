export function deleteInvalidParams(params){
    Object.keys(params).map(key => {
        if (!params[key]) {
            delete params[key]
        }
    })
    return params
}