import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import List from './Pages/List'
import Login from './Pages/Login'
import Register from './Pages/Register'
import './App.css'

export default function App() {
  return <Router>
     <Switch>
        <Route path='/list' component={List}/>
        <Route path='/login' component={Login} exact/>
        <Route path='/register' component={Register} exact/>
        <Redirect to='/list'/>
     </Switch>
  </Router>
}