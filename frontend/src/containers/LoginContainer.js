import React from 'react';
import LoginForm from '../components/LoginForm';
import { callApi } from '../services/api';
import { useAuth } from '../services/auth';
import { useNavigate } from 'react-router-dom';



function LoginContainer(){

    const { login } = useAuth();
    const navigate = useNavigate();


    async function handleLogin(data){
        const response = await callApi('http://localhost:3000/Login/','POST',data);
        const token = response.token

        console.log('User data:', response.json);

        if(token){
            login(token)
            navigate('/home'); // Redirection vers la page d'accueil après la connexion
        }


    };

    return (
        <div>
        <h1>Login Page</h1>
        <LoginForm onLogin={handleLogin} />
        </div>
    );

};

export default LoginContainer;