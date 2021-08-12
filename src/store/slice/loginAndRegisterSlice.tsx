import { createSlice } from '@reduxjs/toolkit'
import { useCallback } from 'react'
import { Dispatch } from '..'
import { FormValues } from '../../Pages/Login'

const url = process.env.REACT_APP_API_URL

export const loginAndRegisterSlice = createSlice({
    name:'handlerLoginAndRegister',
    initialState:{
        name:'',
        token:''
    },
    reducers:{
        login(state,action:{payload:{name:string,token:string}}){
            state.name = action.payload.name
            state.token = action.payload.token
        },
        logout(state){
            state.name = ''
            state.token = ''
        }
    }
})

export const login = (formValues:FormValues) => (dispatch:Dispatch) => {
    return fetch(`${url}/login`,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formValues)
    }).then(async res => {
        if (res.ok) {
            const {user:{name,token}} = await res.json()
            window.localStorage.setItem('token',token)
            dispatch(actions.login({name,token}))
            return { success:true }
        }
        dispatch(actions.logout())
        window.localStorage.removeItem('token')
        return { success:false }
    })
}

export const register = (formValues:FormValues) => (dispatch:Dispatch) => {
    return fetch(`${url}/register`,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formValues)
    }).then(async res => {
        if (res.ok) {
            return { success:true }
        }
        return { success:false }
    })
}

export const logout = () => (dispatch:Dispatch) => {
    dispatch(actions.logout())
    window.localStorage.removeItem('token')
    return Promise.resolve({success:true})
}

export const actions = loginAndRegisterSlice.actions

export default loginAndRegisterSlice.reducer