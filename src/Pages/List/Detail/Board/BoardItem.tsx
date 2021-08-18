import { Board } from "."
import { useTaskTypes } from "../../../../custom-hooks/use-tasks"
import taskIcon from '../../../../assets/task.svg'
import bugIcon from '../../../../assets/bug.svg'
import styled from "@emotion/styled"
import { Card } from "antd"
import { Task } from "../Task"

const TaskTypeIcon = ({id}:{id:number}) => {
    const { data:taskTypes } = useTaskTypes()
    const name = taskTypes?.find(item => item.id === id)?.name
    if (!name) return null
    return <img style={{ width:'5%' }} src={name === 'task' ? taskIcon : bugIcon} />
}

const Container = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244,245,247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 1.5rem;
`

const TaskContainer = styled.div`
    overflow: hidden;
    flex: 1;
    ::-webkit-scrollbar{
        display: none;
    }
`

export default ({board,allTasks}:{board:Board,allTasks:Task[]|undefined}) => {
    //react-query很强大，如果在两秒内针对相同的queryKey有多个请求，那么只会发送一个
    const tasks = allTasks?.filter(task => task.kanbanId === board.id)
    return <Container>
       <h3>{ board.name }</h3>
       <TaskContainer>
            { tasks?.map(task => <>
                <Card key={task.id} style={{ marginBottom:'0.5rem' }}>
                        <div>{task.name}</div>
                        <TaskTypeIcon id={task.typeId} />
                </Card>
                </>
            ) }
       </TaskContainer>
    </Container>
} 