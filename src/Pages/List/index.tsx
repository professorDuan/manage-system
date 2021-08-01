import Search from './Search'
import Table from './Table'
import { Dropdown,Menu } from 'antd'
import { Container,Header,HeaderLeft,Main } from './styles'
import Head from '../../components/header'
import { useState,useEffect } from 'react'
import { useAuth } from '../../custom-hooks/use-auth'
import useHttp from '../../custom-hooks/use-http'
import useAsync from '../../custom-hooks/use-async'
import { deleteInvalidParams } from '../../util'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../../custom-hooks/use-debounce'
import useDocumentTitle from '../../custom-hooks/use-documentTitle'

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
   const navigate = useNavigate()
   if (!window.localStorage.getItem('token')) {
      navigate('/login?from=list')
   }
   useDocumentTitle('任务列表')
   const {name,logout} = useAuth()
   const [params,setParams] = useState({personId:0,name:''})
   const [users,setUsers] = useState<User[]>([])
   const http = useHttp()
   let {run,isLoading,data:projects} = useAsync<Project[]>()
   useEffect(() => {
       http('users',{}).then(setUsers)
   },[])
   useEffect(() => {
       run(http('projects',{data:deleteInvalidParams(params)}))
   },[useDebounce(params)])
   return <Container>
      <Header>
          <Head/>
          <Dropdown overlay={<Menu>
                 <Menu.Item key='logout' onClick={() => logout().then(_ => navigate('/login'))}>退出</Menu.Item>
              </Menu>}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>欢迎{name}归来</a>
          </Dropdown>
      </Header>
      <Main>
          <Search params={params} setParams={setParams} users={users}/>
          <Table loading={isLoading} users={users} pagination={false} bordered={true} dataSource={projects||[]}/>
      </Main>
   </Container>
}