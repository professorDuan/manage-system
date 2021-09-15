import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { Drag, DragChild, Drop, DropChild } from '../../../../components/drag-and-drop'
import { useBoards,useDragEndHandler } from '../../../../custom-hooks/use-boards'
import useDebounce from '../../../../custom-hooks/use-debounce'
import useDocumentTitle from "../../../../custom-hooks/use-documentTitle"
import useGetIdFromUrl from "../../../../custom-hooks/use-getIdFromUrl"
import { useTasks } from '../../../../custom-hooks/use-tasks'
import BoardItem from "./BoardItem"
import CreateBoard from './Create-board'
import SearchPanel from './Search-panel'

export interface Board {
    id: number
    name: string
    projectId: number
}

const Container = styled(DropChild)`
   display: flex;
   flex-direction: row;
   flex: 1;
   overflow-x: scroll;
   overflow-y: hidden;
   ::-webkit-scrollbar {
       display: none;
   }
`

export default () => {
    useDocumentTitle('看板')
    
    const [params,setParams] = useState<{
      processorId:number | undefined,
      name:string | undefined
    }>({
      processorId:undefined,
      name:undefined
    })
    
    const reset = useCallback(() => setParams({
      processorId:undefined,
      name:undefined
    }),[])

    const { project } = useGetIdFromUrl() //拿到url中id对应的project
    const { data:boards } = useBoards()
    const { data:allTasks } = useTasks(useDebounce({...params,processorId:params.processorId ===0 ? undefined : params.processorId}))

    const dragEndHandler = useDragEndHandler()

    //拖拽完成后默认会恢复原样，想保持状态需要在onDragEnd中存到数据库
    return <DragDropContext onDragEnd={dragEndHandler}>
      <h2>{project?.name}看板</h2>
      <SearchPanel params={params} setParams={setParams} reset={reset}/>
          <Drop type='BOARD' direction='horizontal' droppableId='board '>
            <Container>
              { boards?.map((board,index) => (
                  <Drag key={board.id} index={index} draggableId={'board'+index}>
                      <DragChild>
                         <BoardItem board={board} allTasks={allTasks||[]}/>
                      </DragChild>
                  </Drag>
              )) }
              <CreateBoard/>
            </Container>
          </Drop>
    </DragDropContext>
}