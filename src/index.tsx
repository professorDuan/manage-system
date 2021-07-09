import ReactDOM from 'react-dom'
import App from './App'
import { AuthProvider } from './custom-hooks/use-auth'
import 'antd/dist/antd.css'
import {loadDevTools} from 'jira-dev-tool'

loadDevTools(() => { ReactDOM.render(
    <AuthProvider><App/></AuthProvider>,
    document.getElementById('root')
  )
})
