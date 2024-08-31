import { useState, useEffect } from 'react'
import { Product } from '../components/product/Product'

const useIdProduct = (_id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!_id) {
      setError('ID du produit non défini')
      setLoading(false)
      return
    }
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/products/${_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!res.ok) {
          throw new Error(`Erreur lors du chargement du produit : ${res.statusText}`)
        }

        const data: Product = await res.json()
        setProduct(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Une erreur inconnue est survenue')
        }
      } finally {
        setLoading(false)
      }
    }

    if (_id) {
      fetchProduct()
    }
  }, [_id])

  return { product, loading, error }
}

export default useIdProduct
