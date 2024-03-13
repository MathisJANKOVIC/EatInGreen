// AuthentificationForm.js
import React, { useState } from 'react';
// import { callApi } from '../api'; // Importez la fonction callApi depuis votre fichier apiUtils.js
// import { useAuth } from '../AuthContext';

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    // Validation des champs ici si nécessaire

    // Rassemblez les données de l'utilisateur
    const data = {
      name: name,
      email: email,
      password: password,
    };

    // Passez les données au gestionnaire d'inscription du conteneur
    onRegister(data);
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />

        <button type="button" onClick={handleRegistration}>
          Register
        </button>
      </form>
    </div>
  );

}

export default RegisterForm;