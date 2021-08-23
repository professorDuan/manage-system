import useUndo from "../../custom-hooks/use-undo"
import UseDocumentTitle from "../../custom-hooks/use-documentTitle"
import { Button } from 'antd'
import React, { ReactNode, useState } from "react"
import { useCallback } from "react"
import { useEffect } from "react"

//一、测试useReducer(常见面试题，利用useReducer和useContext模拟redux)
// export default () => {
//     UseDocumentTitle('测试页面')
//     const [state,{
//         backward,
//         forward,
//         set,
//         reset, 
//         canBackward,
//         canForward
//     }] = useUndo(0)

//     return <>
//        <span>当前值为{state.present}</span><br/>
//        <Button onClick={forward} disabled={!canForward}>前进</Button>&nbsp;
//        <Button onClick={backward} disabled={!canBackward}>退后</Button>&nbsp;
//        <Button onClick={() => set(state.present+1)}>+1</Button>&nbsp;
//        <Button onClick={() => set(state.present-1)}>-1</Button>&nbsp;
//        <Button onClick={() => reset(0)}>重置</Button>
//     </>
// }

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

/**
 * 五、react中共享数据的方法：
 * 1、状态提升(简单情况下)
 * 2、Component Composition， 利用控制反转的思想在父级组件中完成组件的定义，然后逐层传递给子孙组件(简单情况下)
 * 3、context，跨越层级传递，多用于客户端状态管理(小项目中)
 * 4、redux，多用于客户端状态管理，目前redux-toolkit是最流行的集成了redux-thunk、immutable、react-redux的redux库，详见test/redux-toolkit分支
 * 5、react-query或者swr缓存思想，取代了手动封装的useAsync，一般用于处理服务端返回的数据在多个组件中共享的情况
 *   --https://developer.51cto.com/art/202102/646085.htm
 *   --https://zhuanlan.zhihu.com/p/265146038
 * 6、利用url来管理，需要配合react-router-dom提供的useSearchParams钩子，将需要传递的参数放在url中，不同组件中可以拿到，详见use-controlDialog
 */

//六、React.cloneElement()的使用场景:
//cloneElement第一个参数是React元素，createElement第一个参数是标签名或者组件名,第二个参数都是props，第三个参数都是children，构建react元素
//目标渲染组件，组件接收props也可以直接下面的写法，不用单独定义DataFormat
const Demo = ({style={},children=<></>,...rest}) => {
    return <div style={style} {...rest}>这是Demo组件本身{children}</div>
}
//根据传入的dom和style来创建新的组件，这里的rest包括children和name
const CloneDemo = ({dom=<></>,currentStyle={},...rest}) => {
    //默认样式
    const prevStyle = {
        textAlign:'left',
        color:'black'
    }
    //传入的样式会覆盖原有的样式
    return React.cloneElement(dom,{style:{...prevStyle,...currentStyle},...rest})
}
export default () => (
    <CloneDemo dom={<Demo/>} name={'professor'} currentStyle={{textAlign:'center',color:'red'}}>
        <p>父组件传入的内容</p>
    </CloneDemo>
)

/**
 * 七、react-beautiful-dnd：
 * 代码详见drag-and-drop，隶属于react的一款拖拽的库，主要包括三个组件。https://blog.csdn.net/tianxintiandisheng/article/details/107109890
 * 1、DragDropContext：
 * 1.1、概念：
 * 用于包装拖拽根组件，Draggable和Droppable都需要包裹在DragDropContext内，通常会把入口文件App放在DragDropContext里，嵌套的DragDropContext不支持。
 * 1.2、API：
 * onBeforeCapture：在捕获之前，非必要
 * onBeforeDragStart：在拖动开始之前，非必要
 * onDragStart：在拖动开始时，非必要
 * onDragUpdate：在拖动变化时，非必要
 * onDragEnd：在拖动结束时，必要，用于设定拖拽后数组的重新排序
 * 2、Droppable：
 * 2.1、用法：
 * 包裹Draggable的组件。
 * //droppableId、type记得加上
 * <Droppable droppableId=xx type=xx>
 *   {(provided,snapshot) => {
 *      //定义具体的组件，ref、droppableProps、placeholder记得加上
 *      <div ref={provided.innerRef} 
 *           {...provided.droppableProps}>
 *        ...
 *        {provided.placeholder}
 *      </div>
 *   }}
 * </Droppable>
 * 2.2、Droppable元素上的属性：
 * droppableId：必要，随便加
 * type：非必要，随便加
 * direction：非必要，项目流动的方向，默认vertical，可改horizontal
 * mode：非必要，standard (默认) or virtual，用于将列表指定为虚拟列表（无限渲染的优化方案，后面再研究）
 * 2.3、Droppable的子函数：
 * Droppable的子节点必须是返回react元素的函数，该函数有两个参数：
 * 2.3.1、provided上的属性：
 * innerRef：便于插件查找，加上就行
 * droppableProps：包含一大堆属性，不用管具体是啥，加上就行
 * placeholder：用于计算剩余空间，如例子中所示，必须加在子元素的最后
 * 2.3.2、snapshot上的属性：
 * 提供了与当前拖动状态相关的少量状态，这可以选择性地用于增强组件，不用管
 * 3、Draggable：
 * 3.1、用法：
 * 包装需要拖拽的组件，使组件能够放置。Draggable组件可以被拖放到Droppable上，Draggable必须始终包含在Droppable中。
 * //draggableId、index记得加上
 * <Draggable draggableId=xx index={xx}>
 *    {(provided,snapshot) => {
 *        //定义具体的组件，ref、draggableProps、dragHandleProps记得加上
 *        <div ref={provided.innerRef}
 *             {...provided.draggableProps}
 *             {...provided.dragHandleProps}
 *        >
 *         ...
 *        </div>
 *    }}
 * </Draggable>
 * 3.2、Draggable元素上的属性：
 * draggableId：必要
 * index：必要，它与Draggable的顺序相匹配在Droppable里面，必须连续并且唯一，一般通过map函数提供
 * isDragDisabled：非必要，控制Draggable是否允许拖动
 * 3.3、Draggable的子函数：
 * 3.3.1、provided：
 * ref：便于插件查找，加上就行
 * dragHandleProps：包含一大堆属性，不用管具体是啥，加上就行
 * draggableProps：包含一大堆属性，不用管具体是啥，加上就行
 */