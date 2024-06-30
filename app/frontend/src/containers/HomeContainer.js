import React, { useEffect, useState } from 'react';
import { callApi } from '../services/api';
import NavBar from '../components/NavBar';
import GridListProduct from '../components/GridListProduct';
import { useParams } from 'react-router-dom'; // Assurez-vous d'importer useParams

function HomeContainer(){
    const [listProduct, setListProduct] = useState(null);
    const token = localStorage.getItem('token');
    const { searchText } = useParams(); // Utilisez useParams pour obtenir le texte de recherche

    useEffect(() => {
        async function fetchListProduct() {
            try {
                let response = null;

                console.log(searchText);
                if (searchText === undefined) {
                    response = await callApi('http://localhost:3030/product', 'GET', null, token);
                } else {

                    console.log("okkkk")
                    response = await callApi(`http://localhost:3030/product/search?title=${searchText}`, 'GET', null, token);
                }

                const data = await response;
                console.log('Success:', data); // Vérifiez les données pour vous assurer qu'elles sont correctes
                setListProduct(data); // Mettez à jour uniquement les données de l'utilisateur

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchListProduct();
    }, [searchText]); // Ajoutez searchText comme dépendance pour déclencher l'effet lorsque le texte de recherche change

    return (
        <div>
            <NavBar />
            {listProduct && (
                <GridListProduct listProduct={listProduct}/>
            )}
        </div>
    );

}

export default HomeContainer;
