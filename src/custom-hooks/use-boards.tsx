import useHttp from "./use-http"
import { useQuery,useMutation, useQueryClient } from "react-query"
import { Board } from "../Pages/List/Detail/Board"

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