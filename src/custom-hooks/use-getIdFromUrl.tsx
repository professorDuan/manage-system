import { useQueryProjectById } from "./use-Project"
import { useLocation } from "react-router"

//获取url中xx/list/:id/xx的id
export default () => {
    const { pathname } = useLocation()
    const id = pathname.match(/list\/(\d+)/)?.[1]
    const { project } = useQueryProjectById(Number(id))
    return {project,id:Number(id)}
}