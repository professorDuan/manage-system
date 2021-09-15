import qs from 'qs'
interface fetchConfig extends RequestInit {
    token:string
    data:object
}

function http(url:string,{token,data,...params}:Partial<fetchConfig>){
    //fetch参数
    url = `${process.env.REACT_APP_API_URL}/${url}`
    const config = {
        method:'GET',
        headers:{
            Authorization:token ? `Bearer ${token}` : '',
            'Content-Type' : data ? 'application/json' : ''
        },
        ...params
    }
    if (config.method.toUpperCase() === 'GET') {
        url += `?${qs.stringify(data)}`
    }else {
        config.body = JSON.stringify(data || {})
    }
    return fetch(url,config).then(async res => {
        const data = await res.json()
        if (res.ok) {
            return data
        }
        return Promise.reject(data)
    })
}

export default function UseHttp(){
    let token = window.localStorage.getItem('token') || ''
    return (...[url,config]:Parameters<typeof http>) => http(url,{token,...config})
}