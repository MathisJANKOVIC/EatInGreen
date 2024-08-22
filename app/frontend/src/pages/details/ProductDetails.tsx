import React from 'react'
import { useParams } from 'react-router-dom'
import useIdProduct from '../../hooks/useIdProduct'

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  
  const { product, loading, error } = useIdProduct(id)
  

  if (loading) {
    return <p>Chargement du produit...</p>
  }

  if (error) {
    return <p>Erreur: {error}</p>
  }

  if (!product) {
    return <p>Produit non trouvé</p>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Détails du produit</h1>
      <p>ID du produit: {id}</p>
      <img src={product._imagePaths[0]} alt={product._name} className="w-full h-64 object-cover mb-4" />
      <h2 className="text-2xl mb-2">{product._name}</h2>
      <p className="text-lg mb-2">{product._description}</p>
      <p className="text-xl font-bold mb-2">{product._price} €</p>
      <p className="text-lg mb-2">Stock disponible: {product._stock}</p>
    </div>
  )
}

export default ProductDetails
