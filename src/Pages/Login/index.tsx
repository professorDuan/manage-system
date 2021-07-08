import { Form, Input,Button } from 'antd'
import { useCallback } from 'react'

type FormValues = {
    username:string
    password:string
}

export default () => {
    const submit = useCallback((vals:FormValues) => {
       fetch(`${process.env.REACT_APP_API_URL}/login`,{
           method:'POST',
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify(vals)
       }).then(async res => {
           console.log(await res.json())
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
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
    </Form>
}