import { useCallback, useReducer } from "react"

//传统useState方式定义useUndo
// export default function<T>(initData:T) {
//     const [state,setState] = useState<{
//         prev:T[],
//         present:T,
//         future:T[]
//     }>({
//         prev:[],
//         present:initData,
//         future:[]
//     })

//     const backward = useCallback(() => { //后退
//         setState(currentState => {
//             const { prev,present,future } = currentState
//             if (!prev.length) return currentState
//             return {
//                 prev:prev.slice(0,prev.length-1),
//                 present:prev[prev.length-1],
//                 future:[present,...future]
//             }
//         })
//     },[])

//     const forward = useCallback(() => { //前进  
//         setState(currentState => {
//             const { prev,present,future } = currentState
//             if (!future.length) return currentState
//             prev.push(present)
//             return {
//                 prev:[...prev],
//                 present:future[0],
//                 future:future.slice(1)
//             } 
//         })
//     },[])

//     const set = useCallback((data:T) => { //直接设置一个值
//         setState(currentState => {
//             const { prev,present,future } = currentState
//             if (data === present) return currentState
//             prev.push(present)
//             return {
//                 prev:[...prev],
//                 present:data,
//                 future:[]//试想直接输入一个网址后，此时无法前进
//             }
//         })
//     },[])

//     const reset = useCallback((data:T) => { //重置
//         setState(() => {
//             return {
//                 prev:[],
//                 present:data,
//                 future:[]
//             }
//         })
//     },[])

//     return [
//         state,
//         {
//             backward,
//             forward,
//             set,
//             reset,
//             canBackward:state.prev.length!==0,
//             canForward:state.future.length!==0
//         }
//     ] as const
// }

//使用useReducer来定义useUndo
const BACKWARD = 'backward'
const FORWARD = 'forward'
const SET = 'SET'
const RESET = 'reset'
type State<T> = {
    prev:T[],
    present:T,
    future:T[]
}
type ActionType = typeof BACKWARD | typeof FORWARD | typeof SET | typeof RESET
const reducer = function<T>(state:State<T>,action:{newData?:T,type:ActionType}){
    const { prev,present,future } = state
    switch(action.type){
        case BACKWARD:
            if (!prev.length) return state
            return {
                prev:prev.slice(0,prev.length-1),
                present:prev[prev.length-1],
                future:[present,...future]
            }
        case FORWARD:
            if (!future.length) return state
            prev.push(present)
            return {
                prev:[...prev],
                present:future[0],
                future:future.slice(1)
            }
        case SET:
            if (!action.newData) return state
            prev.push(present)
            return {
                prev:[...prev],
                present:action.newData,
                future:[]
            }
        case RESET:
            if (!action.newData) return state
            return {
                prev:[],
                present:action.newData,
                future:[]
            }
    }
}

export default function<T>(initData:T){
    const [state,dispatch] = useReducer(reducer,{prev:[],present:initData,future:[]})//第二个参数是默认值
    const backward = useCallback(() => dispatch({type:BACKWARD}),[])
    const forward = useCallback(() => dispatch({type:BACKWARD}),[])
    const set = useCallback((newData:T) => dispatch({newData,type:SET}),[])
    const reset = useCallback((newData:T) => dispatch({newData,type:RESET}),[])
    return [state,{backward,forward,set,reset,canBackward:state.prev.length!==0,canForward:state.future.length!==0}] as const
}