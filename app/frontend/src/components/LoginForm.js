import React, { useState } from 'react';
import '../styles/authForm.css'; // Importez votre fichier CSS
import { Link } from 'react-router-dom';

function LoginForm({ onLogin }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(){
    // Validation des champs ici si nécessaire

    // Rassemblez les données de l'utilisateur
    const data = {
      email: email,
      password: password,
    };

    // Passez les données au gestionnaire d'inscription du conteneur
    onLogin(data);
  };

  return (
        <form class="containerForm">

          <img class="logoAuth" src="images/logoShopInGreen.png"/>

          <p class="text">Sign in with your data that you have entered during your registration</p>

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

          <button type="button" onClick={handleLogin} class="buttonAuth">
            <p class="buttonText">Sign In</p>
          </button>

          <Link to="/register" class="redirection">
            You don’t have an account? <span style={{ color: "#A07E53" }}>Register</span>
          </Link>

        </form>
  );

}

export default LoginForm;