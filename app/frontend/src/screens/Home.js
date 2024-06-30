import React, { useEffect } from 'react'; // Importez useEffect depuis React
import HomeContainer from '../containers/HomeContainer';
import { useAuth } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'; // Importez votre fichier CSS

function Home(){
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
            <HomeContainer />
        </div>
    );
};

export default Home;
