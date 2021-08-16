import { Drawer,Input,Spin,Form, Button, Select } from 'antd'
import useControlDialog from '../../custom-hooks/use-controlDialog'
import { useQueryProjectById,useEditProject,useAddProject } from '../../custom-hooks/use-Project'
import { Project, User } from '../../Pages/List'

export default({users}:{users:User[]}) => {
    const { showing,add,id,close } = useControlDialog()
    const { project,isLoading } = useQueryProjectById(Number(id))
    const { mutate,isLoading:loading } = add === 'true' ? useAddProject(close) : useEditProject(Number(id),close)

    //设置表单的初始值
    const [form] = Form.useForm<Pick<Project,'name'|'organization'|'personId'>>()
    if (project) {
        form.setFieldsValue({name:project.name,organization:project.organization,personId:project.personId})
    }else {
        form.resetFields()
    }

    if (isLoading) return <Spin size='large'/>
    return <Drawer visible={showing} onClose={close} width={'100%'}>
        <h1>{add==='true'?'新增':'编辑'}项目</h1>
        <Form form={ form }
            layout='vertical' style={{ width:'40rem' }} 
            onFinish={ (val) => mutate(val) }>
            {/* antd的表单会根据name属性自动添加value和onChange事件，实现双向绑定 */}
            <Form.Item label='名称' name='name' rules={[{required:true,message:'请输入项目名'}]}>
                {/* 如果是自定义的表单，这里需要加上key，否则在切换新增/编辑时react会复用之前的input导致显示异常 */}
                <Input placeholder='请输入项目名'/>
            </Form.Item>
            <Form.Item label='部门' name='organization' rules={[{required:true,message:'请输入部门名'}]}>
                <Input placeholder='请输入部门名'/>
            </Form.Item>
            <Form.Item name='personId' label="负责人" rules={[{required:true,message:'请选择负责人'}]}>
                <Select placeholder='请选择负责人'>
                    { users.map((user,index) => (
                       <Select.Option key={index} value={user.id}>
                        {user.name}
                       </Select.Option>)) 
                    }
                </Select>
            </Form.Item>
            <Form.Item>
                <Button loading={ loading } type='primary' htmlType='submit'>提交</Button>
            </Form.Item>
        </Form>
    </Drawer> 
}