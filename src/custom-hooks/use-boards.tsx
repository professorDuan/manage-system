import useHttp from "./use-http"
import { useQuery } from "react-query"
import { Board } from "../Pages/List/Detail/Board"

//获取看板数据
export const useBoards = (params?: Partial<Board>) => {
    const http = useHttp()
    return useQuery<Board[]>(['boards',params],() => http('kanbans',{data:params}))
}