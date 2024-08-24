import React from 'react'
import { useParams } from 'react-router-dom'
import useIdProduct from '../../hooks/useIdProduct'
import NavBar from '../../components/header/NavBar'

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
    <main className="bg-customGray w-[95%] h-[85%] rounded-lg p-4 mx-auto my-auto flex flex-col transform translate-y-12">
      <NavBar />
      <div className="bg-white w-full h-full mx-auto rounded-lg shadow-lg p-6 flex flex-col md:flex-row mt-6 space-y-4 md:space-y-0 md:space-x-4">
        
        {/* Image du produit */}
        <div className="flex-shrink-0 md:w-1/3 flex flex-col items-center md:items-start">
          <img 
            src={product._imagePaths[0]} 
            alt={product._name} 
            className="w-60 h-60 md:w-80 md:h-80 rounded-lg object-cover"
          />
        </div>

        {/* Description et informations du produit */}
        <div className="flex-grow md:w-2/3">
          {/* Titre du produit */}
          <h1 className="text-3xl font-bold text-[#A07E53] mb-4">{product._name}</h1>
          
          {/* Description du produit avec scrollbar */}
          <div className="text-xl text-[#A07E53] mb-2 max-h-20 overflow-y-auto">
            {product._description}
          </div>

          {/* Informations sur le prix et la quantité */}
          <div className="mt-6">
            <p className="text-lg text-[#A07E53] mb-2">Quantité : {product._stock}</p>
            <p className="text-xl font-bold text-[#A07E53] mb-4">Prix : {product._price} €</p>

            <div className="flex justify-between w-full">
              <button className="bg-green text-white py-2 px-4 rounded-lg hover:bg-green-600 w-1/2 mr-2">
                Ajouter au panier
              </button>
              <button className="bg-green text-white py-2 px-4 rounded-lg hover:bg-green-600 w-1/2 ml-2">
                Mettre en favoris
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails
