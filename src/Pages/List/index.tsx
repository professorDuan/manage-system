import Search from './Search'
import Table from './Table'
import { useState,useEffect } from 'react'
import qs from 'qs'
import {deleteInvalidParams} from '../../util'
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
   const [params,setParams] = useState({personId:0,name:''})
   const [users,setUsers] = useState<User[]>([])
   const [projects,setProjects] = useState<Project[]>([])
   useEffect(() => {
       fetch('http://localhost:3001/users').then(async(res) => {
           if (res.ok){
               setUsers(await res.json())
           }
       })
   },[])
   useEffect(() => {
      fetch(`http://localhost:3001/projects?${qs.stringify(deleteInvalidParams(params))}`).then(async(res) => {
          if (res.ok) {
              setProjects(await res.json())
          }
      })
   },[useDebounce(params)])
   return <div style={{ marginTop:'20px' }}>
      <Search params={params} setParams={setParams} users={users}/>
      <Table users={users} projects={projects}/>
   </div>
}