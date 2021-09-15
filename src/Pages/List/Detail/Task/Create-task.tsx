import { Input } from "antd"
import { useEffect } from "react"
import { useCallback } from "react"
import { useState } from "react"
import useGetIdFromUrl from "../../../../custom-hooks/use-getIdFromUrl"
import { useAddTask } from "../../../../custom-hooks/use-tasks"

export default ({kanbanId}:{kanbanId:number}) => {
    const [name,setName] = useState('')
    const [isInput,setIsInput] = useState(false)//是否是编辑框
    const {id} = useGetIdFromUrl()
    const {mutate} = useAddTask()
    
    const submit = useCallback(() => {
        if (name.trim().length) {
            mutate({projectId:id,name,kanbanId})
        }
    },[name,id,kanbanId])

    const toggle = useCallback(() => setIsInput(mode=>!mode),[])

    //非输入模式下清空输入框
    useEffect(() => {
        if (!isInput) {
            setName('')
        }
    },[isInput])

    if (!isInput) {
        return <div style={{ cursor:'pointer' }} onClick={toggle}>+添加任务</div>
    }
    //autoFocus表示Input显示后直接获取焦点
    return <Input
        autoFocus={true}
        value={name}
        placeholder='请输入任务'
        onBlur={toggle}
        onPressEnter={submit}
        onChange={evt => setName(evt.target.value)}
    />
}