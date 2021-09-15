import { useState,useCallback } from 'react'
import Search from './Search'
import Table from './Table'
import { Dropdown,Menu } from 'antd'
import { Container,Header,Main } from './styles'
import Head from '../../components/header'
import Dialog from '../../components/dialog'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../custom-hooks/use-auth'
import useHttp from '../../custom-hooks/use-http'
import useDocumentTitle from '../../custom-hooks/use-documentTitle'
import { useQuery } from 'react-query'
import { useQueryProject } from '../../custom-hooks/use-Project'
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
    pin?:boolean
}

export default function(){
   const navigate = useNavigate()
   if (!window.localStorage.getItem('token')) {
      navigate('/login?from=list')
   }

   useDocumentTitle('任务列表')
   const { name,logout } = useAuth()
   const [params,setParams] = useState({personId:0,name:''})
   const http = useHttp()

   /**
    * test--自定义类型保护/守卫
    * TS中a变量类型未知时多使用unknown，但调用a.xx时即使加上?也会报错，此时可以使用下面的类型守卫的方式，在目标函数中判断变量的属性或者类型等等，然后返回时a is xx
    * 其他类型保护方式包括in typeof instanceof，详见https://zhuanlan.zhihu.com/p/108856165
    */
   const isError = useCallback((val:any):val is Error => val?.message,[])
   const ErrorBox = (error:unknown) => {
       if (isError(error)) {
           return <>{error.message}</>
       }
   }

   //查询users
   //  useEffect(() => {
   //     http('users',{}).then(setUsers)
   //  },[])
   //useQuery写法
   const {data:users} = useQuery<User[]>('users',() => http('users',{}))

   //查询projects
    // useEffect(() => {
    //     run(http('projects',{data:deleteInvalidParams(params)}))
    // },[useDebounce(params)])
   //useQuery的写法
   const { projects,isLoading } = useQueryProject(useDebounce(params))

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
          <Search params={params} setParams={setParams} users={users||[]}/>
          <Table loading={isLoading} users={users||[]} pagination={false} bordered={true} dataSource={projects||[]}/>
      </Main>
      <Dialog users={users||[]}/>
   </Container>
}