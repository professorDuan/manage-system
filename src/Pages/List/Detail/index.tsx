import Head from '../../../components/header'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Board from './Board'
import Task from './Task'
import NotFound from '../../NotFound'
import Row from '../../common-style/row'

export default () => {
    return <>
      <Head/>
      <Row gap={2}>
        <h2><Link to='board'>看板</Link></h2>
        <h2><Link to='task'>任务组</Link></h2>
      </Row>
      <Routes>  
          <Route path='/board' element={<Board/>}/>
          <Route path='/task' element={<Task/>}/>
          {/* 当前路由/list/:id下的/会重定向到/list/:id/board;location.pathname表示不带域名和参数的路由，例如/list/16 */}
          {/* replace为true表示路由是replace而不是push，因为如果是push，例如/list/16，那么栈中就是[/list,/list/16,/list/16/board],此时点击回退会找到/list/16又会重定向到/list/16/board形成死循环  */}
          <Navigate to={`${window.location.pathname}/board`} replace={true}/>
          {/* 当前路由/list/:id下的其他路径例如/list/16/xx会显示404 */}
          <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
}