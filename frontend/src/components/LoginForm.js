import React, { useState } from 'react';

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
    <div>
      <h2>Login Form</h2>
      <form>

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

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );

}

export default LoginForm;