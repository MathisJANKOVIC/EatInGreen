import React from 'react';
import { Link } from 'react-router-dom';
import { ProductComponent } from '../../components/product/Product';
import useAllProducts from '../../hooks/useAllProducts';
import NavBar from '../../components/header/NavBar';

const ProductList: React.FC = () => {
  const { products, loading, error } = useAllProducts();

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement des produits : {error}</p>;
  }

  return (
    <main className="bg-customGray w-[95%] h-[85%] rounded-lg p-4 mx-auto my-auto transform translate-y-12">
        <NavBar></NavBar>
    <h1 className="text-2xl font-bold mb-4 text-[#A07E53]">Liste des produits</h1>
    <div className="overflow-y-auto max-h-[350px]">
      {products && products.length > 0 ? (
        <ul className="flex flex-wrap justify-start">
          {products.map((product) => (
            <li key={product._id} className="m-4">
              <Link
                to={{
                  pathname: `/details/${product._id}`,
                  state: { product },               
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 } as any} 
                className="block relative bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-60"
              >
                <ProductComponent product={product} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun produit disponible</p>
      )}
    </div>
    
  </main>
  

  );
};

export default ProductList;
