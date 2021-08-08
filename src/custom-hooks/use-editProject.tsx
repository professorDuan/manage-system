import { Project } from "../Pages/List"
import UseHttp from "./use-http"
import useAsync from "./use-async"

export default() => {
    const { run,data,setRes } = useAsync<Project>()
    const mutate = ({id,pin}:Partial<Project>) => {
        const http = UseHttp()
        run(http(`projects/${id}`,{data:{pin},method:'PATCH'})) 
    }
    return { mutate,data }
}