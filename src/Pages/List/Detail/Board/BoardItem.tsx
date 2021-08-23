import { Board } from "."
import { useTaskTypes } from "../../../../custom-hooks/use-tasks"
import taskIcon from '../../../../assets/task.svg'
import bugIcon from '../../../../assets/bug.svg'
import styled from "@emotion/styled"
import { Card } from "antd"
import { Task } from "../Task"
import CreateTask from "../Task/Create-task"
import React from "react"
import { Drag, DragChild, Drop, DropChild } from "../../../../components/drag-and-drop"

const TaskTypeIcon = ({id}:{id:number}) => {
    const { data:taskTypes } = useTaskTypes()
    const name = taskTypes?.find(item => item.id === id)?.name
    if (!name) return null
    return <img style={{ width:'8%' }} src={name === 'task' ? taskIcon : bugIcon} />
}

const Container = styled.div`
    min-width: 20rem;
    border-radius: 6px;
    background-color: rgb(244,245,247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 0.5rem;
`

const TaskContainer = styled.div`
    overflow-y: scroll;
    flex: 1;
`

//provided是cloneElement时传入的属性，不能写在forwardRef的第二个参数里，否则Drag调用时会报错 
export default (({board,allTasks}:{board:Board,allTasks:Task[]}) => {
    const tasks = allTasks?.filter(task => task.kanbanId === board.id)
    return <Container>
       <h3>{ board.name }</h3>
       <TaskContainer>
            <Drop type='TASK' direction='vertical' droppableId={String(board.id)}>
                <DropChild>
                    { tasks?.map((task,index) => (
                          <Drag key={task.id} index={index} draggableId={'task'+task.id}>
                              <DragChild>
                                <Card style={{ marginBottom:'0.5rem' }}>
                                    <div>{task.name}</div>
                                    <TaskTypeIcon id={task.typeId} />
                                </Card>
                              </DragChild>
                          </Drag>
                        )
                    ) }
                </DropChild>
            </Drop>
            <CreateTask kanbanId={board.id}/>
       </TaskContainer>
    </Container>
} )