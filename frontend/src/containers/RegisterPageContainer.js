import React from 'react';
import RegisterForm from '../components.js/RegisterForm';
import { callApi } from '../services/api';

const RegisterPageContainer = () => {

    async function handleRegistration(data){
        const response = await callApi('http://localhost:3000/register/','POST',data);

        // Ajoutez votre logique d'enregistrement ici
        console.log('User data:', response.json());
        // Ajoutez votre appel API d'enregistrement ou d'autres opérations nécessaires
    };

    return (
        <div>
        <h1>Register Page</h1>
        <RegisterForm onRegister={handleRegistration} />
        </div>
    );

};

export default RegisterPageContainer;