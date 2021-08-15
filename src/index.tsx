import ReactDOM from 'react-dom'
import App from './App'
import { AuthProvider } from './custom-hooks/use-auth'
import { QueryClientProvider,QueryClient } from 'react-query'
import 'antd/dist/antd.css'
import {loadDevTools} from 'jira-dev-tool'

loadDevTools(() => ReactDOM.render(
    //使用use-query必须外层包裹QueryClientProvider
    <QueryClientProvider client={ new QueryClient }>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </QueryClientProvider>,
    document.getElementById('root')
  )
)
