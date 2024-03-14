import React, { useEffect } from 'react'; // Importez useEffect depuis React
import ProductContainer from '../containers/ProductContainer';
import { useAuth } from '../services/auth';
import { useNavigate } from 'react-router-dom';

function Product(){
    const { isLoggedIn, login } = useAuth();
    const navigate = useNavigate();

    console.log("testttt")
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Si un jeton existe, connectez automatiquement l'utilisateur en utilisant le contexte d'authentification
            login(token);
        } else if (!isLoggedIn()) {
            // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
            navigate('/login');
        }
    }, [isLoggedIn, navigate, login]);


    return (
        <div>
            <ProductContainer />
        </div>
    );
};

export default Product;
