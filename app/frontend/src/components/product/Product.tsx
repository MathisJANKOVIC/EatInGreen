import React from 'react'

interface Product {
  _id: string
  _name: string
  _price: number
  _stock: number
  _imagePaths: string[]
  _description: string
  _userId: string
}

interface ProductListProps {
  products: Product[]
}

const ProductComponent: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div>
      <img
        src={product._imagePaths[0]}
        className="w-full h-32 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-lg font-bold mb-2 text-white">
          {product._name}
        </h3>
        <p className="text-white">{product._price} €</p>
        <p className="text-white mt-2">Stock: {product._stock}</p>
      </div>
    </div>
  )
}

export { ProductComponent }
export type { ProductListProps, Product }
