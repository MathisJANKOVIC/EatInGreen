import React from 'react';

function CartListProduct({ listProductCart, onCart }) {

    const removeFromCart = (productId) => {
        // Appeler la fonction onCart pour supprimer le produit du panier
        onCart(productId);
    };

    return (
        <div>
            {listProductCart.map(product => (
                <div key={product.id}>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                    <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                </div>
            ))}
        </div>
    );
}

export default CartListProduct;
