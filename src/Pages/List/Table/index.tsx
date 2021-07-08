import { Table } from 'antd'
import { User,Project } from '../index'

export default ({users,projects}:{users:User[],projects:Project[]}) => {
    return <Table style={{ marginTop:'20px' }} bordered={true} pagination={false} dataSource={projects} columns={[
        {
            title:'部门',dataIndex:'name',key:'name'
        },{
            title:'负责人',dataIndex:'personId',key:'id',render:id => (users.find((user:User) => user.id===Number(id)))?.name
        }]}/>
}