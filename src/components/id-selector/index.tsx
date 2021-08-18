import { Select } from 'antd'
import React from 'react'
type Value = string | number | null | undefined
//'1'=>1,null=>0,undefined=>0
const toNumber = (val:Value) => isNaN(Number(val)) ? 0: Number(val)

interface DataFormat extends Omit<React.ComponentProps<typeof Select>,'value'|'placeholder'|'defaultValue'|'onSelect'|'options'>{
    defaultValue:Value //如果没有重置按钮，想选择全部需要这个默认值
    canDefaultValueSelect?:boolean //默认值是否可以被选中（一般情况下要选中）
    onSelect:(val?:number) => void 
    options:{name:string,id:number}[] 
}

//保证最终提交的value是number类型的
export default ({defaultValue,canDefaultValueSelect=false,onSelect,options}:DataFormat) => {
    return (
        <Select defaultValue={ toNumber(defaultValue)} onSelect={ id => onSelect(toNumber(id)) }>
            { (defaultValue || toNumber(defaultValue) === 0) && <Select.Option disabled={canDefaultValueSelect} value={toNumber(defaultValue)}>全部</Select.Option> }
            { options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>) }
        </Select>
    )
}





























