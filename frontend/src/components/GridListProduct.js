import React from 'react';
import { Link } from 'react-router-dom';

function GridListProduct({listProduct}){

    return(
        <div>
            {listProduct.map(product =>(
                <Link to={`/product/${product.id}`} key={product.id}>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                </Link>
            ))}
        </div>
    );
}

export default GridListProduct