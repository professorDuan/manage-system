import useUndo from "../../custom-hooks/use-undo"
import UseDocumentTitle from "../../custom-hooks/use-documentTitle"
import { Button } from 'antd'
import React, { ReactNode, useState } from "react"
import { useCallback } from "react"
import { useEffect } from "react"

//测试useReducer
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

//抽取复用逻辑三种方法
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