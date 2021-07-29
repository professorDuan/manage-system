import { Table, TableProps } from 'antd'
import { User,Project } from '../index'
import DayJs from 'dayjs'
import { memo } from 'react'

interface DataFormat extends TableProps<Project>{
    users:User[]
}

export default memo(({users,...params}:DataFormat) => {
    return <Table style={{ marginTop: '2rem' }} columns={[
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
    ]} {...params}/>
})