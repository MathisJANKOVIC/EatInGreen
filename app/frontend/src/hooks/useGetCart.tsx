import { useState, useEffect } from 'react'
import { CartItem } from '../components/cart/cart'

interface UseCartReturn {
  cart: CartItem[] | null
  loading: boolean
  error: string | null
}

const useGetCart = (_userId: string): UseCartReturn => {
  const [cart, setCart] = useState<CartItem[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true)
      setError(null)

      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          throw new Error('No authentication token found')
        }

        const response = await fetch(`/api/user/${_userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache', // Forcer le rafraîchissement
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()

        console.log('Fetched Data:', data)
        
        if (Array.isArray(data)) {
          setCart(data)
        } else {
          throw new Error('Data is not an array')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [_userId]) 

  return { cart, loading, error }
}

export default useGetCart
