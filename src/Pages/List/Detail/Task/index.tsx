export interface Task{
    id: number
    name: string
    //经办人
    processorId: number
    projectId: number
    //任务组
    epicId: number
    //每个task隶属于一个看板下
    kanbanId: number
    //bug or task
    typeId: number
    note: string
}

export interface TaskType {
    id: number
    name: string
}

export default () => {
    return <>任务列表</>
}