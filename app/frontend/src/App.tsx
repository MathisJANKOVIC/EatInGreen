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
import Favoris from  './pages/favoris/Favoris.tsx'
import BestSeller from './pages/best-sellers/BestSeller.tsx'
import EcoFriendly from './pages/eco-friendly/EcoFriendly.tsx'
import TopRated from './pages/top-rated/TopRated.tsx'
import BuyAgain from './pages/buy-again/BuyAgain.tsx'
import FlashSales from './pages/flash-sales/FlashSales.tsx'
import ProductDetails from './pages/details/ProductDetails.tsx'

const router = createBrowserRouter([
  { path: '/login',element: <Login/> },
  { path: '/register',element: <Register/> },
  { path: '/',element: <Main/>,children: [
    { path: '/',element: <Home/> },
    { path: '/profil',element: <Profil/> },
    { path: '/panier',element: <Panier/> },
    { path: '/favoris',element: <Favoris/> },
    { path: '/best-sellers',element: <BestSeller/> },
    { path: '/eco-friendly',element: <EcoFriendly/> },
    { path: '/top-rated',element: <TopRated/> },
    { path: '/buy-again',element: <BuyAgain/> },
    { path: '/flash-sales',element: <FlashSales/> },
    { path: '/details/:id',element: <ProductDetails/> }
  ] }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)