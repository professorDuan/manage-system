import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import {loadDevTools} from 'jira-dev-tool'
import { Provider } from 'react-redux'
import {store} from './store'

loadDevTools(() => { ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
  )
})
