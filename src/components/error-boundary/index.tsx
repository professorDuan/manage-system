import React from 'react'

//错误边界组件，生产环境时，如果内部JS出现错误React会卸载整个DOM树，展示空白页面，因此可以考虑错误边界组件来处理子孙组件出现的错误，无法捕获事件处理、异步代码、服务端渲染出现的错误。
//如果一个class组件中定义了static getDerivedStateFromError()或者componentDidCatch()钩子中的任意一个或两个，他就是一个错误边界组件。
//当抛出错误后，使用getDerivedStateFromError渲染备用UI，使用或者componentDidCatch打印错误信息。
type fallbackRender = (error:Error|null) => React.ReactElement
//第一个参数是组件的props，第二个参数是组件的state
export default class ErrorBoundary extends React.Component<{children:React.ReactNode,fallbackRender:fallbackRender},{error:Error|null}>{
    state = {error:null}
    static getDerivedStateFromError(error:Error){
        return {error} //收到子孙组件报错，传到state中
    }
    render(){
        if (!this.state.error) {
            return this.props.children
        }
        return this.props.fallbackRender(this.state.error)
    }
}