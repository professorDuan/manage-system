import { useState } from "react"

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
    const [res,setRes] = useState<DataFormat<D|null>>({
        ...defaultData,
        ...initData
    })
    const run = (p:Promise<D>) => {
        if (!p || !p.then) throw new Error('请传入Promise')
        setRes({...res,status:'loading'})
        return p.then(data => {
            setRes({error:null,data,status:'success'})
            return data
        }).catch(error => {
            setRes({data:null,error,status:'error'})
            return Promise.reject(error)
        })
    }
    return {
        run,
        isInitial:res.status==='initial',
        isLoading:res.status==='loading',
        isSuccess:res.status==='success',
        isError:res.status==='error',
        ...res
    }
}