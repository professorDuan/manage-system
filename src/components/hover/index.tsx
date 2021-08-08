import { Popover,Typography,List, Divider, Button } from 'antd'
import { Project } from '../../Pages/List'

interface DataFormat{
    children:React.ReactNode
    projects:Project[]
}

export default ({children,projects}:DataFormat) => {
    projects = projects.filter(project => project.pin)
    const content = <>
      <Typography.Text type={'secondary'}>我的收藏</Typography.Text>
      <List>
        {projects.map((project,index) => <List.Item style={{ width:100,marginBottom:-20 }} key={index}>
            <List.Item.Meta title={project.name}/>
        </List.Item>)}
      </List>
      <Divider/>
      <Button>创建项目</Button>
    </>
    return <Popover
       placement={'bottom'}
       content={content}
       children={children}
    />
}