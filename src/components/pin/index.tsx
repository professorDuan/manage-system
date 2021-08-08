//评分组件
import { Rate } from 'antd'
import React from 'react'
interface DataFormat extends React.ComponentProps<typeof Rate> { 
    checked:boolean
    onCheckedChange?:(checked:boolean) => void
}
export default ({checked,onCheckedChange,...params}:DataFormat) => {
    return <Rate 
       count={1} //总共几颗星星
       value={checked?1:0}//几颗星星被点亮
       onChange={_=>onCheckedChange&&onCheckedChange(checked)}
       {...params}
    />
}