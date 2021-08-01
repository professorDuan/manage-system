import { Table, TableProps } from 'antd'
import { User,Project } from '../index'
import DayJs from 'dayjs'
import { memo } from 'react'
import { Link } from 'react-router-dom'

interface DataFormat extends TableProps<Project>{
    users:User[]
}

export default memo(({users,...params}:DataFormat) => {
    return <Table style={{ marginTop: '2rem' }} columns={[
        {
            //在当前List组件下路由跳转会直接加在/list/后面,注意不要加上/否则会变成根路由
            title:'名称',dataIndex:'name',key:'name',render:(name,project) => <Link to={String(project.id)}>{project.name}</Link>
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