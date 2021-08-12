import useUndo from "../../custom-hooks/use-undo"
import UseDocumentTitle from "../../custom-hooks/use-documentTitle"
import { Button } from 'antd'
import React, { ReactNode, useState } from "react"
import { useCallback } from "react"
import { useEffect } from "react"

//一、测试useReducer(常见面试题，利用useReducer和useContext模拟redux)
export default () => {
    UseDocumentTitle('测试页面')
    const [state,{
        backward,
        forward,
        set,
        reset, 
        canBackward,
        canForward
    }] = useUndo(0)

    return <>
       <span>当前值为{state.present}</span><br/>
       <Button onClick={forward} disabled={!canForward}>前进</Button>&nbsp;
       <Button onClick={backward} disabled={!canBackward}>退后</Button>&nbsp;
       <Button onClick={() => set(state.present+1)}>+1</Button>&nbsp;
       <Button onClick={() => set(state.present-1)}>-1</Button>&nbsp;
       <Button onClick={() => reset(0)}>重置</Button>
    </>
}

//二、抽取复用逻辑几种方法
//0、早期使用的mixin已经被淘汰，一是因为mixin通过React.createClass()创建组件的方式已被废止，二是因为组件和mixin形成了强耦合的状态，会产生依赖，三是多个mixin可能存在相同命名的函数

//1、React HOC
//使用：withWindowWidth(<>xxx</>)
//缺陷：高阶组件传入的props可能会覆盖原有组件的props
const withWindowWidth = (BaseComponent:any) => {
    return class Derived extends React.Component{
        state = {
            windowSize:{
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight
            }
        }
        onResize = () => {
            this.setState({
                windowSize:{
                    width:document.documentElement.clientWidth,
                    height:document.documentElement.clientHeight
                }
            })
        }
        componentDidMount(){
            window.addEventListener('resize',this.onResize)
        }
        componentWillUnmount(){
            window.removeEventListener('resize',this.onResize)
        }
        render(){
            return <BaseComponent {...this.props} {...this.state}/>
        }
    }
}

//2、render props
//使用：<>...<windowSize render={({width,height}) => 渲染逻辑}/></>
//缺陷：可能会出现多级嵌套，https://blog.csdn.net/qq_42062727/article/details/107580510
class windowSize extends React.Component<{render:(params:{height:number,width:number})=>ReactNode}>{
    state = {
        windowSize:{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
    onResize = () => {
        this.setState({
            windowSize:{
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight
            }
        })
    }
    componentDidMount(){
        window.addEventListener('resize',this.onResize)
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.onResize)
    }
    render(){
        return this.props.render(this.state.windowSize)//意思是将需要复用的数据或者方法共享出去，至于如何使用这些数据由子组件的render方法自行定义
    }
}

//3、custom Hook
function UseWindowSize(){
    const [windowSize,setWindowSize] = useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })
    const onResize = useCallback(() => setWindowSize({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    }),[])
    useEffect(() => {
        window.addEventListener('resize',onResize)
        return () => window.removeEventListener('resize',onResize)
    },[])
    return {windowSize,setWindowSize}
}

//三、为什么reducer是纯函数？
/**
 * https://www.jianshu.com/p/e0d5cbd93ccc
 * 无论是类组件还是函数组件或者在reducer中都不建议对原数据(非基本类型)直接修改后返回(例如arr.push()或者arr[index]=xx都不会生效)，因为是浅比较，页面不会更新，因此需要返回一个新的对象
 */

//四、为什么要使用redux-thunk?
/**
 * 涉及到异步操作时，如果不用中间件，可以按照下面的写法：
 * let dispatch = useDispatch()//最新的react-redux提供了useSelector和useDispatch，代替了老版本中connect高阶函数的写法
 * <form onSubmit={
 *     e => {
 *        e.preventDefault()
 *        fetch(...)
 *           .then(res => res.json())
 *           .then(data => dispatch(createAction(data)))
 *     }
 * }/>
 * 如果使用了redux-thunk后，可以按照下面的写法：
 * const fn = () => {
 *     return dispatch => { //redux-thunk会判断action是否为函数，是的话会传入dispatch参数
 *        fetch(...)
 *           .then(res => res.json())
 *           .then(data => dispatch(createAction(data)))
 *     }
 * }
 * <form onSubmit={ 
 *     e => {
 *        e.preventDefault()
 *        dispatch(fn()) //我们在view这一层无需关心异步操作的细节  
 *     }
 * }/>
 */

/**
 * 五、redux-toolkit:
 * 该插件跟Context会冲突，因此切到新分支，该插件内置了redux-thunk、react-redux、immutable
 * 1、在已有的react项目中，安装插件：
 * yarn add react-redux @reduxjs/toolkit
 * 2、创建store：
 * import { configureStore } from '@reduxjs/toolkit'
 * import counterSlice from xx
 * import YYSlice from yy
 * export State = ReturnType<typeof store.getState> //这里主要是针对在组件中使用时无法感知store中共享数据的类型
 * export const store = configureStore({
 *    reducer:{ //起到了combineReducers的作用
 *      counter:counterSlice,
 *      xx:xxSlice
 *    }
 * })
 * 3、创建slice切片(每个reducer)：
 * import { createSlice } from '@reduxjs/toolkit'
 * export const counterSlice = createSlice({
 *    name:'counter', //命名空间，防止actionType命名冲突
 *    initialState:{count:0}, //初始值
 *    reducers:{ //这里定义的属性会被自动导出为action，在组件中可以通过dispatch触发
 *       increment(state,{payload}){ //内置了immutable，可以直接使用赋值的方式进行数据的改变，不需要每一次都返回一个新的state数据
 *          state.count += payload
 *       }
 *    }
 * })
 * export const incrementByAsync = (count:number) => dispatch => setTimeout(() => dispatch(increment(count)),1000) //导出异步action，在组件中供dispatch调用
 * export const { increment } = counterSlice.actions //导出同步action，在组件中供dispatch调用
 * export default counterSlice.reducer //导出reducer供store使用
 * 4、组件中使用：
 * <Provider store={store}>
 *    <App/>
 * </Provider>
 * import { useSelector, useDispatch } from 'react-redux'
 * import { increment, } from 'counterSlice'
 * import { State } from ...
 * function App(){
 *    const {count} = useSelector((state:State) => state.counter) //这里的counter对应store里reducer中的counter
 *    const dispatch = useDispatch() //如果想让dispatch是一个Promise，需要写成const dispatch:(...args:unknown[])=>Promise<any> = useDispatch()
 *    return <>
 *       <button onClick={() => dispatch(increment(1))}>同步+</button>
 *       <button onClick={() => dispatch(incrementByAsync(1))}>异步+</button>
 *       <span>{count}</span>
 *    </>
 * }
 * 5、创建异步action：
 * 除了上述方法建立异步action外，redux-toolkit提供了createAsyncThunk方法，该方法被执行的时候会有三个(pending fulfilled rejected)状态，可以监听状态的改变执行不同的操作，放在slice的extraReducers属性中
 * https://zhuanlan.zhihu.com/p/382487951
 */