import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App/>} />
        </Routes>
      </Router> 
  </Provider> 
  </StrictMode>,
)
