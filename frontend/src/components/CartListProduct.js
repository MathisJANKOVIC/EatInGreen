import React from 'react';

function CartListProduct({ listProductCart, onCart }) {
    let listProductCartParse = JSON.stringify(listProductCart)
    listProductCartParse = JSON.parse(listProductCartParse)


    const removeFromCart = (productId) => {
        // Appeler la fonction onCart pour supprimer le produit du panier
        onCart(productId);
    };

    return (
        <div>
            {listProductCartParse.map(product => (
            <div key={product.productId}>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                    <button onClick={() => removeFromCart(product.productId)}>Remove from Cart</button>
                </div>
            ))}
        </div>
    );
}

export default CartListProduct;
