import styled from "@emotion/styled"
import { Input } from "antd"
import { useCallback } from "react"
import { useState } from "react"
import { useAddBoard } from "../../../../custom-hooks/use-boards"
import useGetIdFromUrl from "../../../../custom-hooks/use-getIdFromUrl"

const Container = styled.div`
    min-width: 20rem;
    border-radius: 6px;
    background-color: rgb(244,245,247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 0.5rem;
`

export default () => {
    const [name,setName] = useState('')
    const { id } = useGetIdFromUrl() //拿到url中id
    const { mutate } = useAddBoard()
    const submit = useCallback(() =>{
        if (name.trim().length) {
            mutate({name,projectId:id})
        }
        setName('')
    },[name,id])

    return <Container>
      <Input placeholder='新建看板名称' size='large' onPressEnter={submit} value={name} onChange={ evt => setName(evt.target.value) } />
    </Container>
}