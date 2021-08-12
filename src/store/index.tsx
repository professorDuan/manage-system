import { configureStore } from '@reduxjs/toolkit'
import projectsSlice from './slice/projectsSlice'
import loginAndRegisterSlice from './slice/loginAndRegisterSlice'

export const store = configureStore({
    reducer:{
        projects:projectsSlice,
        loginAndRegister:loginAndRegisterSlice
    }
})

export type Dispatch = typeof store.dispatch

//store.getState可以拿到所有的共享数据==>{projects:{open:boolean}}
//ReturnType<typeof fn>获取函数返回值的类型,必须加上typeof
//Parameters<typeof fn>获取函数的参数,必须加上typeof,结果将所有参数放进一个数组
export type State = ReturnType<typeof store.getState>