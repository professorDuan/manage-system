 import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom'
import List from './Pages/List'
import Detail from './Pages/List/Detail'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NotFound from './Pages/NotFound'
//import Test from './Pages/Test'
import ErrorBoundary from './components/error-boundary'
import FullPageError from './components/fullPage-error'
import React,{ Suspense } from 'react'

//延迟加载Test组件,可以将一些不常用的组件异步加载，必须default导出，另外需要加上Suspense组件和fallback默认渲染
const Test = React.lazy(() => import('./Pages/Test'))

export default function App() {
  return <ErrorBoundary fallbackRender={error=><FullPageError error={error}/>}>
     <Router>
        <Suspense fallback={<div>loading...</div>}>
         <Routes>
            {/* 默认精确匹配 */}
            <Route path='/list' element={<List/>}/>
            {/* list/:id只能匹配到/list/1这种路由，如果还有/list/1/xx这样的子路由，必须加上*才可匹配到 */}
            <Route path='/list/:id/*' element={<Detail/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/test' element={<Test/>}/>
            {/* 当前路由下的/会重定向到/list */}
            <Navigate to='/list' />
            {/* 其他任何路径都会到404 */}
            <Route path='*' element={<NotFound/>} />
         </Routes>
        </Suspense>
     </Router>
  </ErrorBoundary>
}