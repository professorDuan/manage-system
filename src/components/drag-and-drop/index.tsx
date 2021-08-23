import React, { ReactNode } from "react"
import { Droppable,DroppableProps,Draggable,DraggableProps, DroppableProvided, DraggableProvided } from "react-beautiful-dnd"

//封装Droppable组件
//原本DroppableProps的children是一个函数，但我们希望传入的时候以html标签来定义==> <Drop><div>...</Drop>
type DropProps = Omit<DroppableProps,'children'> & { children:ReactNode }
export const Drop = ({ children,...props }:DropProps) => {
    return <Droppable {...props}>
        {(provided) => {
            //这里体现出cloneElement或者createElement的使用场景
            if (React.isValidElement(children)) {
                return React.cloneElement(children,{
                    ref:provided.innerRef,
                    ...provided.droppableProps,
                    provided
                })
            }
            return <div/>
        }}
    </Droppable>
}

/**
 * 封装Droppable下的第一层标签元素。如果没有这个组件，那么就得写成<DropProps><div ref=xx {...provided.droppableProps}>...</div></DropProps>这种格式，
 * 通过该组件可以实现外层的封装，避免每次使用时手动添加props。自定义组件中如果想接收外部传入的ref,可以通过forwardRef方法。范型第一个元素是props类型，第二个元素是返回值类型，
 * 这里的ref是当<Drop><DropChild/></Drop>调用时通过cloneElement传入到DropChild中的。
 */
export const DropChild = React.forwardRef<
    HTMLDivElement,
    //加上Partial是因为我们在使用时<DropChild><div>...</div></DropChild>并不会加上provided，provided是Drop组件赋予的
    //React.HTMLAttributes是里面定义的div，需要加上否则使用时报错（不仅仅针对本处，所有自定义组件想添加子元素时都要加上）
    Partial<{provided:DroppableProvided}>&React.HTMLAttributes<HTMLDivElement>
>(({children,provided,...props},ref) => {
    //当定义一个组件，需要添加子元素时，要想显示子元素==>  <div>{children}</div>
    //插件规定placeholder必须有，它会自动计算还有多少空间，并且得放在children下面
    return <div ref={ref} {...props}>
        {children}
        {provided?.placeholder}
    </div>
})

//封装Draggable组件
type DragProps = Omit<DraggableProps,'children'> & { children:ReactNode }
export const Drag = ({ children,...props }:DragProps) => {
    return <Draggable {...props}>
        {(provided) => {
            if (React.isValidElement(children)) {
                return React.cloneElement(children,{
                    ref:provided.innerRef,
                    provided
                })
            }
            return <div/>
        }}
    </Draggable>
}

//封装Draggable下的第一个标签元素
export const DragChild = React.forwardRef<
    HTMLDivElement,
    Partial<{provided:DraggableProvided}>&React.HTMLAttributes<HTMLDivElement>
>(({provided,children},ref)=>{
    return <div ref={ref} {...provided?.draggableProps} {...provided?.dragHandleProps}>
        {children}
    </div>
})