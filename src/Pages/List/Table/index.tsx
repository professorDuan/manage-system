import { Table } from 'antd'
import { User,Project } from '../index'
import DayJs from 'dayjs'

export default ({users,projects}:{users:User[],projects:Project[]}) => {
    return <Table style={{ marginTop: '2rem' }} bordered={true} pagination={false} dataSource={projects} columns={[
        {
            title:'名称',dataIndex:'name',key:'name'
        },
        {
            title:'部门',dataIndex:'organization',key:'organization'
        },
        {
            title:'创建时间',dataIndex:'created',key:'created',render:created => created ? DayJs(created).format('YYYY-MM-DD') : '无'
        },
        {
            title:'负责人',dataIndex:'personId',key:'id',render:id => (users.find((user:User) => user.id===Number(id)))?.name
        }
    ]}/>
}