import React, { useEffect, useState } from 'react';
import { callApi } from '../services/api';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import CartListProduct from '../components/CartListProduct';


function CartContainer(){   
    const [listProductCart, setListProductCart] = useState(null);

    const token = localStorage.getItem('token');



    useEffect(() => {
        async function fetchListProductCart() {
            try {
                const response = await callApi(`http://localhost:3000/user`, 'GET', null, token);
                const user = await response;
                const data = user.user.cart
                console.log("test "+ data[0].productId)
                setListProductCart(data); // Mettez à jour uniquement les données de l'utilisateur
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchListProductCart();
    }, []);

    async function removeFromCart(productId){
        const response = await callApi(`http://localhost:3000/user/remove-from-cart/${productId}`,'DELETE', null, token);

        console.log('remove:', response.json);

    };

    return (
        <div>
            <NavBar />
            {listProductCart && (
                <CartListProduct listProductCart={listProductCart} onCart={removeFromCart}/> 
            )}
        </div>
    );

}

export default CartContainer;