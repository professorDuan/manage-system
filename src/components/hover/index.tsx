import { Popover,Typography,List, Divider, Button } from 'antd'
import { useMemo } from 'react'
import useControlDialog from '../../custom-hooks/use-controlDialog'
import { useQueryProject } from '../../custom-hooks/use-Project'

interface DataFormat{
    children:React.ReactNode
}

export default ({children}:DataFormat) => {
    const { openAddProject } = useControlDialog()
    let { projects } = useQueryProject({personId:0,name:''})
    const collectProjects = useMemo(() => (projects||[]).filter(project => project?.pin),[projects])

    const content = <>
      <Typography.Text type={'secondary'}>我的收藏</Typography.Text>
      <List>
        {collectProjects.map((project,index) => <List.Item style={{ width:100,marginBottom:-20 }} key={index}>
            <List.Item.Meta title={project.name}/>
        </List.Item>)}
      </List>
      <Divider/>
      <Button onClick={ openAddProject }>创建项目</Button>
    </>
    
    return <Popover
       placement={'bottom'}
       content={content}
       children={children}
    />
}