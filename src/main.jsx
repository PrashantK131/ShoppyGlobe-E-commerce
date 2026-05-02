import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Redux Provider wraps the entire app */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
