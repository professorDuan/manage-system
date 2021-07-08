//防抖
import { useState,useEffect } from 'react'
export default function useDebounce<T>(params:T,delay=1000){
    const [debounceParams,setParams] = useState<T>()
    useEffect(() => {
        let timer = window.setTimeout(() => setParams(params),delay)
        return () => window.clearTimeout(timer)
    },[params])
    return debounceParams
}