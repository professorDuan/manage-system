import Search from './Search'
import Table from './Table'
import { Dropdown,Menu } from 'antd'
import { Container,Header,HeaderLeft,Main } from './styles'
import {ReactComponent as Logo} from '../../assets/software-logo.svg'//以SVG标签展示一个SVG文件(直接import xx from会以图片形式渲染)
import { useState,useEffect } from 'react'
import { UseAuth } from '../../custom-hooks/use-auth'
import UseHttp from '../../custom-hooks/use-http'
import {deleteInvalidParams} from '../../util'
import { useHistory } from 'react-router'
import { Redirect } from 'react-router-dom'
import useDebounce from '../../custom-hooks/use-debounce'

export type User = {
    id:number
    name:string
}

export interface Project {
    id:number
    personId:number
    name:string
    organization:string
    created:number
}

export default function(){
   if (!window.localStorage.getItem('token')) {
       return <Redirect to={{ pathname:'/login',state:{from:'/list'} }} />
   }
   const {push} = useHistory()
   const {name,logout} = UseAuth()
   const [params,setParams] = useState({personId:0,name:''})
   const [users,setUsers] = useState<User[]>([])
   const [projects,setProjects] = useState<Project[]>([])
   const http = UseHttp()
   useEffect(() => {
       http('users',{}).then(setUsers)
   },[])
   useEffect(() => {
       http('projects',{data:deleteInvalidParams(params)}).then(setProjects)
   },[useDebounce(params)])
   return <Container>
      <Header>
          <HeaderLeft gap={3}>
              <Logo width={'18rem'} color={'rgb(38,132,255)'}/>
              <h3>项目</h3>
              <h3>用户</h3>
          </HeaderLeft>
          <Dropdown overlay={<Menu>
                 <Menu.Item key='logout' onClick={() => logout().then(_ => push('/login'))}>退出</Menu.Item>
              </Menu>}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>欢迎{name}归来</a>
          </Dropdown>
      </Header>
      <Main>
          <Search params={params} setParams={setParams} users={users}/>
          <Table users={users} projects={projects}/>
      </Main>
   </Container>
}