import { AppRouter } from './routes'
import { Provider } from 'react-redux'
import { UserProvider } from "./providers/user"
import store from './store'
import './App.less'
function App() {

  return <Provider store={store}>
    <UserProvider>
      <AppRouter />
    </UserProvider>
  </Provider>
}

export default App
