import useHttp from "./use-http"
import { useQuery } from "react-query"
import { Task, TaskType } from "../Pages/List/Detail/Task"

//获取任务列表
export const useTasks = (params?: Partial<Task>) => {
    const http = useHttp()
    return useQuery<Task[]>(['tasks',params],() => http('tasks',{data:params}))
}

//获取任务列表的类型
export const useTaskTypes = () => {
    const http = useHttp()
    return useQuery<TaskType[]>(['taskTypes'],() => http('taskTypes',{}))
}