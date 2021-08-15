import { Project } from "../Pages/List"
import useHttp from "./use-http"
import { useQuery,useMutation,QueryClient } from "react-query"
import { deleteInvalidParams } from "../util"

//react-query中查询均使用useQuery钩子，第一个参数可以是string或者array（string是key，后面增删改都找这个key）
export const useQueryProject = (params?:{ personId:number,name:string }) => {
    const http = useHttp()
    const { data:projects,isLoading,error } = useQuery<Project[]>(['projects',params],()=>http('projects',{data:deleteInvalidParams(params)}))
    return { projects,isLoading,error }
}

export const useQueryProjectById = (id?:number) => {
    const http = useHttp()
    /**
     * react-query的缓存是根据key来决定的，如果key是数组，那么第二个元素就是依赖，例如第一次访问ID为1时就会在缓存里记录下这个project的信息，那么下次再查询ID=1时
     * 就会直接从缓存中获取，不会发请求。目前这种写法下只要页面重绘就会执行回调函数，又不好写在useEffect里，不清楚如何解决...
     */
    const queryKey = ['projects',{id}]
    //enabled表示只有ID有值才触发
    const { data:project,isLoading } = useQuery<Project>(queryKey,() => http(`projects/${id}`,{}),{ enabled:Boolean(id) }) 
    return { project,isLoading }
}

//react-query中增删改使用useMutation钩子，第二个参数的onSuccess表示执行成功后需要更新缓存，这样数据才会刷新
export const useEditProject = (id?:number,callback?:() => void) => {
    const queryClient = new QueryClient
    const http = useHttp()
    const queryKey = ['projects',{id}]
    const editProject = (params:Partial<Project>) => http(`projects/${id||params.id}`,{data:params,method:'PATCH'})
    const { mutate,isLoading,data } = useMutation(editProject,{  //mutate调用时触发editProject
        onSuccess:() => { //这个钩子会在editProject执行成功后调用
            queryClient.invalidateQueries(queryKey)
            callback && callback()
        },
        //实现乐观更新，点击评分时在数据未返回之前，将评分进行修改(否则可能遇到网络延时等待太久导致UI没更新)
        onMutate(target){ //这个钩子会在editProject执行前被调用,target就是mutate时传递的参数params
            const prevProjects = queryClient.getQueryData(queryKey)//拿到原始数据
            queryClient.setQueryData(//找到目标元素提前进行修改
                queryKey,
                (old:unknown) => (old as Project[])?.map((project) => project.id === target.id ? {...project,...target} : {...project})
            )
            return { prevProjects } //如果出错将数据传递给onError函数的第三个参数，方便回滚
        },
        onError(error,newProject,context:any){  //如果mutate执行时出错
            queryClient.setQueryData(queryKey,context.prevProjects) //直接回滚到原始数据
        }
      }
    )
    return { mutate,isLoading,data }
}

export const useAddProject = (callback?:() => void) => {
    const queryClient = new QueryClient
    const http = useHttp()
    const addProject = (params:Partial<Project>) => http('projects',{data:{created:Date.now(),pin:true,...params},method:'POST'})
    const { mutate,isLoading,data } = useMutation(addProject,{ 
        onSuccess:() => {
            queryClient.invalidateQueries('projects')
            callback && callback()
        }
      }
    )
    return { mutate,isLoading,data }
}

export const useDeleteProject = () => {}