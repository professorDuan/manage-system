import { Drawer,Input,Spin,Form, Button } from 'antd'
import { useState } from 'react'
import useControlDialog from '../../custom-hooks/use-controlDialog'
import { useQueryProjectById,useEditProject,useAddProject } from '../../custom-hooks/use-Project'
import { Project, User } from '../../Pages/List'
import IdSelector from '../id-selector'

export default({users}:{users:User[]}) => {
    const { showing,add,id,close } = useControlDialog()
    const { project,isLoading } = useQueryProjectById(Number(id))
    const [params,setParams] = useState<Pick<Project,'name'|'organization'|'personId'>>({
        name:'',organization:'',personId:0
    })
    const { mutate,isLoading:loading } = add === 'true' ? useAddProject(close) : useEditProject(Number(id),close)
    if (isLoading) return <Spin size='large'/>
    
    return <Drawer visible={showing} onClose={close} width={'100%'}>
        <h1>{add==='true'?'新增':'编辑'}项目</h1>
        <Form layout='vertical' style={{ width:'40rem' }} onFinish={ () => mutate(params) }>
            <Form.Item label='名称' name='name' rules={[{required:true,message:'请输入项目名'}]}>
                <Input placeholder='请输入项目名' 
                       defaultValue={ project?.name || '' } 
                       onChange={ e => setParams({...params,name:e.target.value}) }
                />
            </Form.Item>
            <Form.Item label='部门' name='organization' rules={[{required:true,message:'请输入部门名'}]}>
                <Input placeholder='请输入部门名' 
                       defaultValue={ project?.organization || '' }
                       onChange={ e => setParams({...params,organization:e.target.value}) }
                />
            </Form.Item>
            <Form.Item name='id' label="负责人" style={{ width:"20%" }}>
                <IdSelector 
                    defaultValue={Number(project?.personId||params.personId)}
                    defaultOptionName='全部'
                    onSelect={ (personId:number|undefined) => {
                        personId = Number(personId)
                        if (personId !== 0) {
                            setParams({...params,personId:Number(personId)})
                        }
                    } }
                    options={users}
                />
            </Form.Item>
            <Form.Item>
                <Button loading={loading} type='primary' htmlType='submit'>提交</Button>
            </Form.Item>
        </Form>
    </Drawer> 
}