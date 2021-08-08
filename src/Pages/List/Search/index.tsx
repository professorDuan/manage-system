import {User} from '../index'
import IdSelector from '../../../components/id-selector'
import { Button, Form, Input } from 'antd'
import { memo } from 'react'

type Params = {personId:number,name:string}
interface DataFormat {
    params:Params
    setParams:(params:Params) => void
    open:boolean
    setOpen:(open:boolean)=>void
    users:User[]
}

export default memo(({params,users,setParams,setOpen}:DataFormat) => {
    return <Form labelCol={{ span: 20 }} wrapperCol={{ span: 20 }} layout='inline'>
       <Form.Item name='name' label="部门" style={{ width:"30%" }}>
          <Input placeholder="请输入部门名" value={params.name} onChange={e => setParams({...params,name:e.target.value})}/>
       </Form.Item>
       <Form.Item name='id' label="负责人" style={{ width:"20%" }}>
          <IdSelector 
              defaultValue='0'
              defaultOptionName='全部'
              onSelect={ val => setParams({...params,personId:Number(val)}) }
              options={users}
          />
       </Form.Item>
       <Form.Item style={{ float:'right',marginLeft:'350px' }}>
           <Button onClick={_=>setOpen(true)}>新增任务</Button>
       </Form.Item>
    </Form>
})