import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/authForm.css'; // Importez votre fichier CSS


function RegisterForm({ onRegister }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    function handleRegistration(){
        // Validation des champs ici si nécessaire

        // Rassemblez les données de l'utilisateur
        const data = {
        fullName: name,
        email: email,
        password: password,
        };

        // Passez les données au gestionnaire d'inscription du conteneur
        onRegister(data);
    };

    

    return (
        <form class="containerForm">

        <img class="logoAuth" src="images/logoShopInGreen.png"/>

        <p class="text">Create a account with your mail, your name and a secure password </p>

        <label>
            Username:
            <input
            class="inputAuth"
                type="text"
                placeholder="Your name"

                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </label>

        <label>
            Email:
            <input
            class="inputAuth"
            type="email"
            value={email}
            placeholder='youremail@gmail.com'
            onChange={(e) => setEmail(e.target.value)}
            />
        </label>

        <label>
            Password:
            <input
            class="inputAuth"
            type="password"
            placeholder='********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <p class="forgot">forgot password?</p>
        </label>

        <button type="button" onClick={handleRegistration} class="buttonAuth">
            <p class="buttonText">Sign up</p>
        </button>

        <Link to="/login" class="redirection">
            You have already a  account? <span style={{ color: "#A07E53" }}>Login</span>
        </Link>

        </form>
    );

}

export default RegisterForm;