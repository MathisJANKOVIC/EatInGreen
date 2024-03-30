import React, { useEffect, useState } from 'react';
import { callApi } from '../services/api';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import DisplayProduct from '../components/DisplayProduct';


function ProductContainer(){
    const [productData, setProductData] = useState(null);

    const token = localStorage.getItem('token');
    const { id } = useParams();



    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await callApi(`http://localhost:3030/product/${id}`, 'GET', null, token);
                const data = await response;
                console.log('Success:', data); // Vérifiez les données pour vous assurer qu'elles sont correctes
                setProductData(data); // Mettez à jour uniquement les données de l'utilisateur
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchProduct();
    }, []);

    async function addToCart(data, productId){
        const response = await callApi(`http://localhost:3030/user/add-to-cart/${productId}`,'POST', data, token);

        console.log('User data:', response.json);

    };

    return (
        <div>
            <NavBar />
            {productData && (
                <DisplayProduct productData={productData} onCart={addToCart}/>
            )}
        </div>
    );

}

export default ProductContainer;