import { Form, Input,Button,message, Divider } from 'antd'
import qs from 'qs'
import { Container,Title,ShadowCard,Header,BackGround,LongBtn } from '../common-style/loginAndRegisterStyles'
import { useCallback } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../../custom-hooks/use-auth'
import useDocumentTitle from '../../custom-hooks/use-docoumentTitle'

export type FormValues = {
    username:string
    password:string
}

export default () => {
    useDocumentTitle('登录')
    const navigate = useNavigate()
    const {login} = useAuth()
    const submit = useCallback((vals:FormValues) => {
       login(vals).then(res => {
          if (res.success) {
            let redirect = qs.parse(window.location.search.substr(1))['from'] || 'list'
            navigate(`/${redirect}`)
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

            <Form.Item>
              <LongBtn type="primary" htmlType="submit">登录</LongBtn>
              <Divider/>
              <Link to='/register'>还没有账号？快去注册吧</Link>
            </Form.Item>
        </Form>
      </ShadowCard>
    </Container>
}