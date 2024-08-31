import { useState } from 'react'
import { CartItem } from '../components/cart/cart'

const useCart = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addToCart = async (cartItem: CartItem) => {
    setLoading(true)
    setError(null)
    
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch('/api/user/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(cartItem),
      })

      if (!response.ok) {
        throw new Error('Failed to add product to cart')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return { addToCart, loading, error }
}

export default useCart
