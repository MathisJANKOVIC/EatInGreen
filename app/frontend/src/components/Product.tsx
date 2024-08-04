import React from 'react';

interface ProductProps {
  image: string;
  name: string;
  price: string;
  rating?: number;
}

const Product: React.FC<ProductProps> = ({ image, name, price, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-60 m-4">
    <img src={image} alt={name} className="w-full h-32 object-cover " />
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2 text-[#A07E53]">{name}</h3>
      <p className="text-gray-600">{price}</p>
      {rating && (
        <div className="mt-2 flex items-center">
          <span>{rating}</span> <span className="text-yellow-500 ml-1">⭐</span>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default Product;
