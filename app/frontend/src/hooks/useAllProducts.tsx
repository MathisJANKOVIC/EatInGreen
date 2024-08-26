import { useState, useEffect } from 'react'
import { Product } from '../components/product/Product'

interface FetchProductsResponse {
    products: Product[] 
}

const useAllProducts = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        console.log('API Response Status:', res.status)

        if (!res.ok) {
          throw new Error(`Erreur: ${res.statusText}`)
        }

        const data: FetchProductsResponse | Product[] = await res.json()
        console.log('API Response Data:', data)

        if (Array.isArray(data)) {
          setProducts(data) 
        } else if (data && 'products' in data) {
          setProducts(data.products) 
        } else {
          throw new Error('Structure de données inattendue')
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error('Fetch Error:', err.message)
          setError(err.message)
        } else {
          setError('Une erreur inconnue est survenue')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

export default useAllProducts
