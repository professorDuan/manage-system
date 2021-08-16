//处理Select的提交值，变成number类型
import { Select } from 'antd'
import React from 'react'
const toNumber = (val:unknown) => isNaN(Number(val)) ? 0: Number(val)
interface DataFormat extends Omit<React.ComponentProps<typeof Select>,'defaultValue'|'onSelect'|'options'>{
    defaultValue:string | number | null | undefined
    onSelect:(val?:number) => void
    options?:{name:string,id:number}[]
    defaultOptionName?:string,
    defaultValueCanSelect?:boolean
}

export default ({defaultValue,defaultValueCanSelect=true,options,defaultOptionName,onSelect}:DataFormat) => {
    return <Select defaultValue={ toNumber(defaultValue) } onSelect={val => onSelect(toNumber(val))}>
        { defaultOptionName && defaultOptionName.length && <Select.Option key={Math.random()} disabled={!defaultValueCanSelect} value={0}>{ defaultOptionName }</Select.Option> }
        { options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>) }
    </Select>
}





























