import Head from '../../../components/header'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Board from './Board'
import Task from './Task'
import NotFound from '../../NotFound'
import styled from '@emotion/styled'
import { Menu } from 'antd'
import { useLocation } from 'react-router'

export default () => {
    const ScreenContainer = styled.div`
       margin-top: 0.5rem;
       height: calc(93vh - 0.5rem);
       display: grid;
       grid-template-columns: 6rem 1fr;
    `

    const Aside = styled.div`
       background-color: rgb(244,245,247);
       display: flex;  
    `

    //A中的B想实现滚动效果，A要么固定像素宽/高，如果A的父级是flex/grid布局然后A是比例分配，那么有时A需要加上overflow:hidden溢出隐藏
    const Main = styled.div`
       box-shadow: -5px 0 5px -5px rgba(0,0,0,0.1);
       margin-left: 1rem;
       display: flex;
       flex-direction: column;
       overflow: hidden;
    `

    //刚进入页面时Menu高亮显示
    const pathArr = useLocation().pathname.split('/')
    const path = pathArr[pathArr.length-1]

    return <>
      <Head/>
      <ScreenContainer>
        <Aside>
           <Menu mode='inline' selectedKeys={[path]}>
              <Menu.Item key='board'>
                 <Link to='board'>看板</Link>
              </Menu.Item>
              <Menu.Item key='task'>
                 <Link to='task'>任务组</Link>
              </Menu.Item>
           </Menu>
        </Aside>
        <Main>
            <Routes>  
                <Route path='/board' element={<Board/>}/>
                <Route path='/task' element={<Task/>}/>
                {/* 当前路由/list/:id下的/会重定向到/list/:id/board;location.pathname表示不带域名和参数的路由，例如/list/16 */}
                {/* replace为true表示路由是replace而不是push，因为如果是push，例如/list/16，那么栈中就是[/list,/list/16,/list/16/board],此时点击回退会找到/list/16又会重定向到/list/16/board形成死循环  */}
                <Navigate to={`${window.location.pathname}/board`} replace={true}/>
                {/* 当前路由/list/:id下的其他路径例如/list/16/xx会显示404 */}
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </Main>
      </ScreenContainer>
    </>
}