import { useRef,useEffect } from 'react'

//离开组件时是否保持title不变
export default (title:string,keepPrevTitleOnUnMount=false) => {
    const prevTitle = useRef(document.title).current
    useEffect(() => {
        document.title = title
    },[title])
    useEffect(() => {
        return () => {
            if (keepPrevTitleOnUnMount) 
               document.title = prevTitle  
        }
    },[prevTitle,keepPrevTitleOnUnMount])
}