import React, { useState } from 'react';

function DisplayProduct({ productData, onCart }) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const addToCart = () => {
        // Rassemblez les données du produit
        const data = {
            quantity: quantity,
        };

        // Passez les données au gestionnaire d'ajout au panier
        onCart(data, productData.id);
    };

    return (
        <div>
            <h2>{productData.title}</h2>
            <p>{productData.description}</p>
            <p>Price: {productData.price}</p>
            <label>
                Quantity:
                <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={handleQuantityChange}
                />
            </label>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default DisplayProduct;
