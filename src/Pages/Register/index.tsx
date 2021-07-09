import { Form, Input,Button,message} from 'antd'
import { useCallback } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { UseAuth } from '../../custom-hooks/use-auth'

export default () => {
    const {register} = UseAuth()
    const {push} = useHistory()
    const submit = useCallback(({username,password,repassword}:{username:string,password:string,repassword:string}) => {
        if (password !== repassword) {
            message.error('两次密码不一致')
            return
        }
        register({username,password}).then(res => {
            if(res.success){
              message.success('注册成功')
              window.setTimeout(() => push('/login'),100)
              return
            }
            else message.error('用户名已经存在')
        })
    },[])
    return <Form
        style={{ margin:'20px auto' }}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={submit}
    >
        <Form.Item
          label="账号"
          name="username"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="密码"
          name="repassword"
          rules={[{ required: true, message: '请确认密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">注册</Button>
          <Link to='/login' style={{ marginLeft:10 }}>已有账号了？请登录</Link>
        </Form.Item>
    </Form>
}