import React, { useState } from 'react';
import '../styles/profil.css'; // Importez votre fichier CSS
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom


function ProfilForm({ userData, onProfil }) {
    const [email, setEmail] = useState(userData.user.email);
    const [name, setName] = useState(userData.user.fullName);
    const [password, setPassword] = useState('');
    let data = null

    function handleProfil() {
        // Validation des champs ici si nécessaire

        // Rassemblez les données de l'utilisateur
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
        <div class="containerUserPage">
            <form class="containerFormUser">
                <img class="imgPageProfil" src="../images/gamer.png"/>
                <label class="labelInfoUser">
                    Username:
                    <input
                        class="inputProfilPage"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />

                <label class="labelInfoUser">
                    Email:
                    <input
                        class="inputProfilPage"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />

                <label class="labelInfoUser">
                    Password:
                    <input
                        class="inputProfilPage"
                        type="password"
                        placeholder="change password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />

                <button class="buttonProfilPage" type="button" onClick={handleProfil}>
                    Modifier
                </button>
            </form>

            <div class="containerRight">
                <Link style={{color:"black"}} to='/cart'>
                <div class="containerPanier">
                    <img class="imgPaCo" src="../images/shopping-basket.png"></img>
                    <p class="textPaCo">Mon panier</p>
                </div>
                </Link>
                <div class="containerCommande">
                    <img class="imgPaCo" src="../images/history.png"></img>
                    <p class="textPaCo">Mes commandes</p>
                </div>
            </div>
        </div>
    );
}

export default ProfilForm;
