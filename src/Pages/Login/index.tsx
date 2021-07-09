import { Form, Input,Button,message } from 'antd'
import { useCallback } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { UseAuth } from '../../custom-hooks/use-auth'

export type FormValues = {
    username:string
    password:string
}
interface DataFormat{
    location:{state:{from:string}}
}

export default ({location}:DataFormat) => {
    const {push} = useHistory()
    const {login} = UseAuth()
    const submit = useCallback((vals:FormValues) => {
       login(vals).then(res => {
          if (res.success) {
            push((location.state&&location.state.from)?location.state.from:'/')
            return
          }
          else message.error('账号或者密码错误')
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">登录</Button>
          <Link to='/register' style={{ marginLeft:20 }}>还没有账号？快去注册吧</Link>
        </Form.Item>
    </Form>
}