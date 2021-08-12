import { Popover,Typography,List, Divider, Button } from 'antd'
import { Project } from '../../Pages/List'
import { actions } from '../../store/slice/projectsSlice'
import { useDispatch } from 'react-redux'
import { memo } from 'react'

interface DataFormat{
    children:React.ReactNode
    projects:Project[]
}

export default memo(({children,projects}:DataFormat) => {
    const dispatch = useDispatch()
    projects = projects.filter(project => project.pin)
    const content = <>
      <Typography.Text type={'secondary'}>我的收藏</Typography.Text>
      <List>
        {projects.map((project,index) => <List.Item style={{ width:100,marginBottom:-20 }} key={index}>
            <List.Item.Meta title={project.name}/>
        </List.Item>)}
      </List>
      <Divider/>
      <Button onClick={() => dispatch(actions.toggleOpen())}>创建项目</Button>
    </>
    return <Popover
       placement={'bottom'}
       content={content}
       children={children}
    />
})