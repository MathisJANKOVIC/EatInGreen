import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function NavBar({onSearch}) {
    
    function handleNavigation(route) {
        // Vous pouvez ajouter ici la logique de navigation
        console.log(`Navigating to ${route}`);
    }

    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <header>
            <div className="containerLogo">
                <p>LOGO</p>
            </div>

            <div className="navBar">
                <nav>
                    <ul>
                        <li>
                            <Link to="/home" onClick={() => handleNavigation('/home')}>Home</Link>
                        </li>
                        <li>
                            <Link to="/ourBrand" onClick={() => handleNavigation('/ourBrand')}>Our Brand</Link>
                        </li>
                        <li>
                            <Link to="/bestSeller" onClick={() => handleNavigation('/bestSeller')}>Best-Seller</Link>
                        </li>
                        <li>
                            <Link to="/secondHand" onClick={() => handleNavigation('/secondHand')}>Second-Hand</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="containerSearch">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                    placeholder="Search..."
                />
                <button onClick={handleSearch}>Search</button>            
            </div>

            <div className="containerProfil">
                <Link to="/profil" onClick={() => handleNavigation('/profil')}>
                        <img src="images/gamer.png" alt="Profil" />
                </Link>           
            </div>
        </header>
    );
}

export default NavBar;
