import React, { useEffect } from 'react'; // Importez useEffect depuis React
import { useAuth } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import CartContainer from '../containers/CartContainer';

function Cart(){
    const { isLoggedIn, login } = useAuth();
    const navigate = useNavigate();

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
            <CartContainer />
        </div>
    );
};

export default Cart;
