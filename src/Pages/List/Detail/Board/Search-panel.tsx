import { Button, Input, Select } from "antd"
import { useQuery } from "react-query"
import { User } from "../.."
import useHttp from "../../../../custom-hooks/use-http"
import Row from "../../../common-style/row"

type Params = {
    processorId:number | undefined,
    name:string | undefined
}

interface DataFormat{
    params:Params
    setParams:(params:Params) => void
    reset:() => void
}

export default ({params,setParams,reset}:DataFormat) => {
    const http = useHttp()
    const { data:users } = useQuery<User[]>('users',() => http('users',{}))
    return <Row gap={2} style={{ marginBottom:20 }}>
        <Input style={{ width:'20rem' }} placeholder='任务名' value={ params.name } onChange={ evt => setParams({...params,name:evt.target.value}) }/>
        <Select placeholder='负责人' value={ params.processorId } style={{ width:'20rem' }} onSelect={ processorId => setParams({...params,processorId:Number(processorId)}) }>
            { users?.map((user,index) => <Select.Option key={index} value={user.id}>{user.name}</Select.Option>) }
        </Select>
        <Button onClick={ reset }>重置</Button>
    </Row>
}