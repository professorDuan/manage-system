import { useRef,useEffect } from "react"

//判断组件是否卸载
export default () => {
    const mountedRef = useRef(false)
    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    },[])
    return { isMounted:mountedRef.current }
}