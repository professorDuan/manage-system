import { Button, Dropdown, Menu, Table, TableProps } from 'antd'
import { User,Project } from '../index'
import DayJs from 'dayjs'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import Pin from '../../../components/pin'
import { useEditProject } from '../../../custom-hooks/use-Project'
import useControlDialog from '../../../custom-hooks/use-controlDialog'

interface DataFormat extends TableProps<Project>{
    users:User[]
}

export default memo(({users,...params}:DataFormat) => {
    const { mutate } = useEditProject()
    const { openEditProject } = useControlDialog()
    return <Table style={{ marginTop: '2rem' }} columns={[
        {
            //本项目由于后端没有pin字段，点击无法生效
            title:<Pin checked={true}/>,dataIndex:'pin',key:'pin',render:(pin,project) => <Pin checked={pin} onCheckedChange={pin => mutate({id:project.id,pin:!pin})}/>
        },
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
        },
        {
            title:'操作',key:'operation',render(operation,project){
                return (
                <Dropdown overlay={ <Menu>
                    <Menu.Item key='edit' onClick={ ()=>openEditProject(project.id) }>编辑</Menu.Item>
                    <Menu.Item key='delete'>删除</Menu.Item>
                </Menu> }>
                    <Button type='link'>...</Button>
                </Dropdown>)
            }
        }
    ]} {...params}/>
})