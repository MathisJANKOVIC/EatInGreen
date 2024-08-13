import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './main.tsx'
import './tailwind.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/Login.tsx'
import Register from './pages/auth/Register.tsx'
import Home from './pages/home/Home.tsx'
import Profil from './pages/profil/profil.tsx'
import Panier from './pages/panier/Panier.tsx'
const router = createBrowserRouter([
  {path: "/login",element: <Login/>},
  {path: "/register",element: <Register/>},
  {path: "/",element: <Main/>,children: [
    {path: "/",element: <Home/>},
    {path: "/profil",element: <Profil/>},
    {path: "/panier",element: <Panier/>}


  ]}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)