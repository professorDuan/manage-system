import { Form, Input,message, Divider } from 'antd'
import { Container,Title,ShadowCard,Header,BackGround,LongBtn } from '../common-style/loginAndRegisterStyles'
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
    return <Container>
      <Header/>
      <BackGround/>
      <ShadowCard>
        <Title>请登录</Title>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={submit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input placeholder='账号'/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder='密码'/>
          </Form.Item>
          <Form.Item>
            <LongBtn type="primary" htmlType="submit">登录</LongBtn>
            <Divider/>
            <Link to='/register'>还没有账号？快去注册吧</Link>
          </Form.Item>
        </Form>
      </ShadowCard>
    </Container>
}