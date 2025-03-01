import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
const queryClient= new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/*' element={<App/>} />
        </Routes>
      </Router>
    </QueryClientProvider>  
  </Provider> 
  </StrictMode>,
)
