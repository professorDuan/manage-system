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

//三、为什么reducer是纯函数？为什么必须返回一个新的state？
/**
 * https://www.jianshu.com/p/e0d5cbd93ccc
 */

//四、为什么要使用redux-thunk?
/**
 * let dispatch = useDispatch()//最新的react-redux提供了useSelector和useDispatch，代替了老版本中connect高阶函数的写法
 * 涉及到异步操作时，如果不用中间件，可以按照下面的写法：
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