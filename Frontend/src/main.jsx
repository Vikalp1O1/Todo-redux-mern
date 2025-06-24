import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import AddTodo from './components/AddTodo.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/add' element={<AddTodo />} />
    </Routes>
    </BrowserRouter>
    </Provider>
    <Toaster position='top-center' />
  </StrictMode>,
)
