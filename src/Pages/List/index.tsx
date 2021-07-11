import Search from './Search'
import Table from './Table'
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
   return <div>
      <Search params={params} setParams={setParams} users={users}/>
      <Table users={users} projects={projects}/>
      <div style={{ position:'absolute',top:20,right:50 }}> 
        <span>欢迎{name}归来</span>&nbsp;&nbsp;<a onClick={e => {
            e.preventDefault()
            logout().then(_ => push('/login'))
        }}>退出</a>
      </div>
   </div>
}