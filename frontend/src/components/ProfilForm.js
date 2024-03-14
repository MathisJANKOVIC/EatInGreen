import React, { useState } from 'react';

function ProfilForm({ userData, onProfil }) {
    const [email, setEmail] = useState(userData.user.email);
    const [name, setName] = useState(userData.user.fullName);
    const [password, setPassword] = useState('');
    let data = null

    function handleProfil() {
        // Validation des champs ici si nécessaire

        // Rassemblez les données de l'utilisateur
        console.log('password : ' + password)
        if(password == undefined || password == ""){
            data = {
                newFullName: name,
                newEmail: email,
            };
        }else{
            data = {
                newFullName: name,
                newEmail: email,
                newPassword : password
            };
        }
        
        

        // Passez les données au gestionnaire d'inscription du conteneur
        onProfil(data);
    };

    return (
        <div>
            <h2>Profil Form</h2>
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
                        placeholder="change password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />

                <button type="button" onClick={handleProfil}>
                    Modifier
                </button>
            </form>
        </div>
    );
}

export default ProfilForm;
