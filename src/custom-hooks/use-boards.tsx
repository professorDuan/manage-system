import useHttp from "./use-http"
import { useQuery,useMutation, useQueryClient } from "react-query"
import { Board } from "../Pages/List/Detail/Board"
import { DropResult } from "react-beautiful-dnd"
import { useSaveTask, useTasks } from "./use-tasks"

//获取看板数据
export const useBoards = (params?: Partial<Board>) => {
    const http = useHttp()
    return useQuery<Board[]>(['boards',params],() => http('kanbans',{data:params}))
}

//增加看板
export const useAddBoard = () => {
    const queryClient = useQueryClient() 
    const http = useHttp()
    const addBoard = (params?:Partial<Board>) => http('kanbans',{data:params,method:'post'})
    const { mutate,data:board } = useMutation(addBoard,{
        onSuccess(){
            queryClient.invalidateQueries('boards')
        }
    })
    return { mutate,board }
}

//保存看板拖拽后的结果
export const useSaveBoard = () => {
    const queryClient = useQueryClient() 
    const http = useHttp()
    const saveBoard = (params:{
        fromId:number//要拖拽的元素
        referenceId:number//拖拽到的目标
        type:'before'|'after'//放到目标前还是后
    }) => http('kanbans/reorder',{data:params,method:'post'})
    const { mutate,data } = useMutation(saveBoard,{ //这里没做乐观更新
        onSuccess(){
            queryClient.invalidateQueries('boards')
        }
    })
    return { mutate,data }
}

//处理看板/任务拖拽后的操作
export const useDragEndHandler = () => {
    const { data:boards } = useBoards()
    const { data:tasks } = useTasks()
    const { mutate:saveBoard } = useSaveBoard()
    const { mutate:saveTask } = useSaveTask()
    //source:{droppableId:number,index:number},droppableId是定义Droppable是赋予的，index是该拖拽项在Droppable中的索引
    const dragEndHandler = ({ source,destination,type }:DropResult) => {
        if (!destination || !source) return
        //处理看板拖动
        if (type === 'BOARD') {
            const fromId = boards && boards[source.index].id
            const referenceId = boards && boards[destination.index].id
            if (!fromId || !referenceId || fromId===referenceId) return
            const type = destination.index > source.index ? "after" : "before"
            saveBoard({fromId,referenceId,type})
        }
        //处理任务拖动(可以跨看板，也可在同一看板中)
        if (type === 'TASK') {
            const fromKanbanId = Number(source.droppableId)
            const toKanbanId= Number(destination.droppableId)
            const fromId = tasks?.filter(task => task.kanbanId === fromKanbanId)[source.index].id
            const referenceId = tasks?.filter(task => task.kanbanId === Number(toKanbanId))[destination.index].id
            if (!fromId || !referenceId || fromId === referenceId) return
            const type = (fromKanbanId === toKanbanId && destination.index > source.index) ? 'after' : 'before'
            saveTask({fromId,referenceId,fromKanbanId,toKanbanId,type})
        }
    }
    return dragEndHandler
}