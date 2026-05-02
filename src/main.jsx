import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Redux Provider for wrapping the entire app */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
