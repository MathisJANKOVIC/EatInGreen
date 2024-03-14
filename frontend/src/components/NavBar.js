import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/navBar.css'; // Importez votre fichier CSS
import { useNavigate } from 'react-router-dom';


function NavBar({onSearch}) {
    const navigate = useNavigate();

    function handleNavigation(route) {
        // Vous pouvez ajouter ici la logique de navigation
        console.log(`Navigating to ${route}`);
    }

    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        navigate(`/search/${searchText}`); // Redirection vers la page d'accueil après la connexion

    };

    return (
        <header>
            <div className="containerLogo">
                <img class="logo" src="../images/logoShopInGreen.png"/>
            </div>

            <div className="navBar">
                <nav>
                    <ul>
                        <li >
                            <Link class="link firstLink" to="/home" onClick={() => handleNavigation('/home')}>Home</Link>
                        </li>
                        <li>
                            <Link class="link" to="/ourBrand" onClick={() => handleNavigation('/ourBrand')}>Our Brand</Link>
                        </li>
                        <li>
                            <Link class="link" to="/bestSeller" onClick={() => handleNavigation('/bestSeller')}>Best-Seller</Link>
                        </li>
                        <li>
                            <Link class="link" to="/secondHand" onClick={() => handleNavigation('/secondHand')}>Second-Hand</Link>
                        </li>
                        <li>
                            <Link class="link lastLink" to="/Cart" onClick={() => handleNavigation('/Cart')}>Cart</Link>
                        </li>
                        <div class="bloc"></div>

                    </ul>
                </nav>
            </div>

            <div className="containerSearch">
                <input
                    class="inputNav"
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                    placeholder="Search..."
                />
                <button onClick={handleSearch}>
                <img class="imgSearch" src="../images/magnifying-glass.png" alt="Profil" />
                </button>            
            </div>

            <div className="containerProfil">
                <Link to="/profil" onClick={() => handleNavigation('/profil')}>
                        <img class="imgProfil" src="../images/gamer.png" alt="Profil" />
                </Link>           
            </div>
        </header>
    );
}

export default NavBar;
