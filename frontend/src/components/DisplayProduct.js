import React, { useState } from 'react';
import '../styles/displayProduct.css'; // Importez votre fichier CSS

function DisplayProduct({ productData, onCart }) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const addToCart = () => {
        alert("article ajoutez au panier")
        // Rassemblez les données du produit
        const data = {
            quantity: quantity,
        };

        // Passez les données au gestionnaire d'ajout au panier
        onCart(data, productData.id);
    };

    return (
        <div class="containerOneProduct">

            <img class="imgOneProduct" src="../images/phone.jpg"/>

            <div class="bigInfo">
                <h2 class="titleOne">{productData.title}</h2>
                <p>{productData.description}</p>
                <p class="priceOne">{productData.price}<span style={{color:"#66A865"}}>$</span></p>
                <label class="quantity">
                    Quantty:
                    <input class="inputQty"
                        type="number"
                        value={quantity}
                        min="1"
                        onChange={handleQuantityChange}
                    />
                </label>
                <button class="addToCart" onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    );
}

export default DisplayProduct;
