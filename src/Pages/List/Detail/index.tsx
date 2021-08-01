import Head from '../../../components/header'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Board from './Board'
import Task from './Task'
import NotFound from '../../NotFound'

export default () => {
    return <>
      <Head/>
      <h2>大力出奇迹</h2>
      <Link to='board'>看板</Link>&nbsp;
      <Link to='task'>任务组</Link>
      <Routes>
          <Route path='/board' element={<Board/>}/>
          <Route path='/task' element={<Task/>}/>
          {/* 当前路由/list/:id下的/会重定向到/list/:id/board;location.pathname表示不带域名和参数的路由，例如/list/16 */}
          <Navigate to={`${window.location.pathname}/board`}/>
          {/* 当前路由/list/:id下的其他路径例如/list/16/xx会显示404 */}
          <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
}