import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import { useBoards } from '../../../../custom-hooks/use-boards'
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

const Container = styled.div`
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

    return <>
      <h2>{project?.name}看板</h2>
      <SearchPanel params={params} setParams={setParams} reset={reset}/>
      <Container>
          { boards?.map((board,index) => <BoardItem key={index} board={board} allTasks={allTasks}/>) }
          <CreateBoard/>
      </Container>
    </>
}