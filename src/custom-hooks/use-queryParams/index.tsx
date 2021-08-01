import { useSearchParams } from 'react-router-dom' //可以拿到url中的参数信息

//获取所有给定参数的属性值
export default function<K extends string>(keys:K[]){ 
    const [searchParams,setSearchParams] = useSearchParams()
    return [
       keys.reduce((prev,key) => {
           return {...prev,[key]:searchParams.get(key)||''}
       },{} as {[key in K]:string}),//reduce的返回结果跟第二个参数一致，因此加上as断言
       setSearchParams
    ] as const //as const用于规定元祖格式的数据类型与元祖中每个元素相同
}