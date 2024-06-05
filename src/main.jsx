import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


const router = createHashRouter(
  createRoutesFromElements(
    <Route path='/*' element={<App />} />
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
