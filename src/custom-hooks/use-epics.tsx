import useHttp from "./use-http"
import { useQuery,useMutation, useQueryClient } from "react-query"
import { Epic } from "../Pages/List/Detail/Task"

export const useEpics = (params?: Partial<Epic>) => {
    const http = useHttp()
    return useQuery<Epic[]>(['epics',params],() => http('epics',{data:params}))
}

export const useAddEpic = () => {
    const queryClient = useQueryClient() 
    const http = useHttp()
    const addEpic = (params?:Partial<Epic>) => http('epics',{data:params,method:'post'})
    const { mutate,data:board } = useMutation(addEpic,{
        onSuccess(){
            queryClient.invalidateQueries('epics')
        }
    })
    return { mutate,board }
}