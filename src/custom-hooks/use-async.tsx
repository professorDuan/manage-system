import { useState } from "react"
import useMounted from "../custom-hooks/use-mounted"

interface DataFormat<D> {
    error:Error | null
    data: D | null
    status:'initial' | 'loading' | 'error' | 'success'
}

const defaultData:DataFormat<null> = {
    error:null,
    data:null,
    status:"initial"
}

export default function<D>(initData?:DataFormat<D>){
    const { isMounted } = useMounted()
    const [res,setRes] = useState<DataFormat<D|null>>({
        ...defaultData,
        ...initData
    })
    const setSuccessState = (data:D) => {
        setRes({error:null,status:'success',data})
    }
    const setErrorState = (error:Error) => {
        setRes({error,status:'error',data:null})
    }
    const run = (p:Promise<D>) => {
        if (!p || !p.then) throw new Error('请传入Promise')
        setRes({...res,status:'loading'})
        return p.then(data => {
            if (isMounted) { //组件不存在时setState会报错
                setSuccessState(data)
            }
            return data
        }).catch(error => {
            if (isMounted) {
                setErrorState(error)
            }
            return Promise.reject(error)
        })
    }
    return {
        run,
        isInitial:res.status==='initial',
        isLoading:res.status==='loading',
        isSuccess:res.status==='success',
        isError:res.status==='error',
        setRes,
        setSuccessState,
        setErrorState,
        ...res
    }
}