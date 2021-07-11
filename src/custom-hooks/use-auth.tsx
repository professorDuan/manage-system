import React,{ReactNode, useCallback} from "react"
import { useState } from "react"
import { FormValues } from "../Pages/Login"
import { useContext } from "react"

const AuthContext = React.createContext<{
    name:string|null,
    token:string|undefined,
    login:(val:FormValues)=>Promise<{success:boolean}>,
    register:(val:FormValues)=>Promise<{success:boolean}>,
    logout:()=>Promise<void>
  } | undefined
>(undefined)

export function AuthProvider({children}:{children:ReactNode}){
    const url = process.env.REACT_APP_API_URL
    const [name,setName] = useState<string | null>(null)
    const [token,setToken] = useState<string | undefined>(undefined)
    const login = useCallback(({username,password}:FormValues) => {
        return fetch(`${url}/login`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        }).then(async res => {
            if (res.ok){
                const {user:{name,token}} = await res.json()
                window.localStorage.setItem('token',token)
                setName(name)
                setToken(token)
                return {success:true}
            }else {
                setName(null)
                setToken(undefined)
                window.localStorage.removeItem('token')
                return {success:false}
            }
        })
    },[url])
    const register = useCallback(({username,password}:FormValues) => {
        return fetch(`${url}/register`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        }).then(async res => {
            if(res.ok){
                return {success:true}
            }else {
                return {success:false}
            }
        })
    },[url])
    const logout = useCallback(() => {
        window.localStorage.removeItem('token')
        setName(null)
        return Promise.resolve()
    },[])
    return <AuthContext.Provider children={children} value={{ name,token,login,register,logout }}/>
}

export function UseAuth(){
    const context = useContext(AuthContext)
    if (!context) throw Error('context不存在!') 
    return context
}