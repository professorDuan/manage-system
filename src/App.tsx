import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import List from './Pages/List'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ErrorBoundary from './components/error-boundary'
import FullPageError from './components/fullPage-error'

export default function App() {
  return <ErrorBoundary fallbackRender={error=><FullPageError error={error}/>}>
     <Router>
      <Switch>
         <Route path='/list' component={List}/>
         <Route path='/login' component={Login} exact/>
         <Route path='/register' component={Register} exact/>
         <Redirect to='/list'/>
      </Switch>
     </Router>
  </ErrorBoundary>
}