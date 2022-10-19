import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import store from "../src/Redux/store"
import { BrowserRouter } from 'react-router-dom'
import Testerpage from './Testerpage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        {/* <Testerpage/> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
