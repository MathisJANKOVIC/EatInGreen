import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './Main.tsx'
import './tailwind.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/Login.tsx'
import Register from './pages/auth/Register.tsx'
import Home from './pages/home/Home.tsx'

const router = createBrowserRouter([
  {path: "/login",element: <Login/>},
  {path: "/Register",element: <Register/>},
  {path: "/",element: <Main/>,children: [{path: "/",element: <Home/>}]}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)