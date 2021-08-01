import { HeaderLeft } from "../../Pages/List/styles"
import { ReactComponent as Logo } from '../../assets/software-logo.svg'//以SVG标签展示一个SVG文件(直接import xx from会以图片形式渲染)

export default () => {
    return <HeaderLeft gap={3}>
        <Logo style={{ cursor:'pointer' }} width={'18rem'} color={'rgb(38,132,255)'} onClick={_ => window.location.href=`${process.env.REACT_APP_API_URL}/`}/>
        <h3>项目</h3>
        <h3>用户</h3>
    </HeaderLeft>
}