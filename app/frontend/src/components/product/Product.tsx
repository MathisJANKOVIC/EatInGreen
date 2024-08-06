
interface ProductProps {
  image: string;
  name: string;
  price: string;
  rating?: number;
}

const Product: React.FC<ProductProps> = ({ image, name, price, rating }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-60 m-4">
      <img src={image} alt={name} className="w-full h-32 object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-lg font-bold mb-2 text-white">{name}</h3>
        <p className="text-white">{price}</p>
        {rating && (
          <div className="mt-2 flex items-center">
            <span className="text-white">{rating}</span> 
            <span className="text-yellow-500 ml-1">⭐</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
