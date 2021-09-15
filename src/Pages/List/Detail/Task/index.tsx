import { List } from "antd"
import Row from "../../../common-style/row"
import { useEpics } from "../../../../custom-hooks/use-epics"
import useGetIdFromUrl from "../../../../custom-hooks/use-getIdFromUrl"
import dayjs from "dayjs"
import { useTasks } from "../../../../custom-hooks/use-tasks"
import { Link } from "react-router-dom"

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

export interface Epic {
    id: number
    name: string
    projectId: number
    ownerId: number
    //开始时间
    start: number
    //结束时间
    end: number
}

export default () => {
    const { project } = useGetIdFromUrl()
    const { data:epics } = useEpics()
    const { data:tasks } = useTasks()

    return <div style={{ paddingLeft:'2rem' }}>
       <h1>{project?.name}任务组</h1>
       <List dataSource={epics} itemLayout='vertical' renderItem={epic => <List.Item>
           <List.Item.Meta 
              title={<Row gap={2}>
                  <span>{epic.name}</span>
              </Row>}
              description={<div>
                  <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                  <div>结束时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
              </div>}
           />
           <div>
               { tasks?.filter(task => task.epicId === epic.id).map(task => <Link key={task.id} to="#">
                   { task.name }
               </Link>) }
           </div>
       </List.Item>}></List>
    </div>
}