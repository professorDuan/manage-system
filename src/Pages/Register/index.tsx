import { Form, Input,Divider,message} from 'antd'
import { Container,Title,ShadowCard,Header,BackGround,LongBtn } from '../common-style/loginAndRegisterStyles'
import { useCallback } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../../custom-hooks/use-auth'
import useDocumentTitle from '../../custom-hooks/use-docoumentTitle'

export default () => {
    useDocumentTitle('注册')
    const {register} = useAuth()
    const navigate = useNavigate()
    const submit = useCallback(({username,password,repassword}:{username:string,password:string,repassword:string}) => {
        if (password !== repassword) {
            message.error('两次密码不一致')
            return
        }
        register({username,password}).then(res => {
            if(res.success){
              message.success('注册成功')
              window.setTimeout(() => navigate('/login'),100)
              return
            }
            else message.error('用户名已经存在')
        })
    },[])
    return <Container>
      <Header/>
      <BackGround/>
      <ShadowCard>
      <Title>请注册</Title>
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

          <Form.Item
            name="repassword"
            rules={[{ required: true, message: '请确认密码' }]}
          >
            <Input.Password placeholder='确认密码'/>
          </Form.Item>

          <Form.Item>
            <LongBtn type="primary" htmlType="submit">注册</LongBtn>
            <Divider/>
            <Link to='/login'>已有账号了？请登录</Link>
          </Form.Item>
        </Form>
      </ShadowCard>
    </Container>
}