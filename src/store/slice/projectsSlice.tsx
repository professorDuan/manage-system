import { createSlice } from '@reduxjs/toolkit'

export const projectsSlice = createSlice({
    name:'projects',
    initialState:{
        open:false,
    },
    reducers:{
        toggleOpen(state){
            state.open = !state.open
        }
    }
})

export const actions = projectsSlice.actions //导出操作state的action

export default projectsSlice.reducer