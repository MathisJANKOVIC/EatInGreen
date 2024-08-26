import React from 'react'
import useGetCart from '../../hooks/useGetCart'
import { useParams } from 'react-router-dom'
import NavBar from '../../components/header/NavBar'
import { CartItem } from '../../components/cart/cart'

const CartPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <p>ID utilisateur non spécifié.</p>
  }

  const { cart, loading, error } = useGetCart(id)

  // Debugging: Log cart data, loading state, and errors
  console.log('Loading:', loading)
  console.log('Error:', error)
  console.log('Cart:', cart)

  if (loading) {
    return <p>Chargement du panier...</p>
  }

  if (error) {
    return <p>Erreur : {error}</p>
  }

  return (
    <main className='bg-customGray w-[95%] h-[85%] rounded-lg p-4 mx-auto my-auto flex flex-col transform translate-y-12'>
      <NavBar />
      <div className='flex mt-6 space-x-4 flex-grow'>
        <div className='w-3/4 flex flex-col space-y-4 h-full'>
          <div className='bg-white p-4 rounded-lg shadow-md flex-1 overflow-hidden'>
            <h2 className='text-lg font-semibold mb-4 text-[#A07E53]'>Votre Panier</h2>
            <div className='overflow-y-auto max-h-[350px]'>
              {cart && cart.length > 0 ? (
                <div className='space-y-4'>
                  {cart && cart.length > 0 ? (
                    <ul className="flex flex-wrap justify-start">
                      {cart.map((item: CartItem) => (
                        <li key={item.productId} className="m-4">
                          <div className="block relative bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-60 p-4">
                            <div className='mb-2'>
                              <h3 className='text-xl font-semibold'>Product:</h3>
                              <p>{item.productId}</p>
                            </div>
                            <div className='mb-2'>
                              <h3 className='text-xl font-semibold'>Quantity:</h3>
                              <p>{item.quantity}</p>
                            </div>
                         
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucun élément dans le panier</p>
                  )}
                </div>
              ) : (
                <p className='text-center'>Votre panier est vide</p>
              )}
            </div>
          </div>
        </div>
        <div className='w-1/4 bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold mb-4 text-[#A07E53]'>Total : XXX €</h2>
          <button className='bg-[#83C082] text-white p-4 rounded-md w-full'>
              Passer commande
          </button>
        </div>
      </div>
    </main>
  )
}

export default CartPage
