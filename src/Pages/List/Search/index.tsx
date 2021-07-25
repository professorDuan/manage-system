import {User} from '../index'
import { Form, Input, Select } from 'antd'
const { Option } = Select

type Params = {personId:number,name:string}
interface DataFormat {
    params:Params
    setParams:(params:Params) => void
    users:User[]
}

export default ({params,users,setParams}:DataFormat) => {
    return <Form labelCol={{ span: 20 }} wrapperCol={{ span: 20 }} layout='inline'>
       <Form.Item name='name' label="部门" style={{ width:"30%" }}>
          <Input placeholder="请输入部门名" value={params.name} onChange={e => setParams({...params,name:e.target.value})}/>
       </Form.Item>
       <Form.Item name='id' label="负责人" style={{ width:"20%" }}>
          <Select defaultValue=""  onSelect={ val => setParams({...params,personId:Number(val)}) }>
            <Option value="">全部</Option>
            {users.map((user:User) => <Option key={user.id} value={user.id}>{user.name}</Option>)}
          </Select>
       </Form.Item>
    </Form>
}