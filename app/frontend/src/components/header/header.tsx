import Logo from '../../assets/Logo.png'
import { useState, useEffect } from 'react'
import SearchInputForm from '../../components/input/SearchBar'
import Pdp from '../../assets/Pdp.png'
import Panier from '../../assets/Panier.png'
import Favoris from '../../assets/Favoris.png'
import HeaderLink from '../../components/link/HeaderLink'
import { Link } from 'react-router-dom'

function Header() {
  const [token, setToken] = useState<string | null>(null)
  const id = localStorage.getItem('id') //demandez avant de toucher !
  console.log(`User ID: ${id}`) // Vérifie que cette valeur est correcte

  useEffect(() => {
    // Charger le token depuis localStorage au chargement initial
    const storedToken = localStorage.getItem('authToken')
    if (storedToken) {
      setToken(storedToken) // Met à jour l'état local avec le token récupéré
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-customWhite z-50 shadow-md">

      <div className="flex items-center space-x-4 w-2/3">
        <a href="/">
          <img src={Logo} alt="EatInGreen" className="h-16 w-auto" />
        </a>
        <div className="flex-grow">
          <SearchInputForm placeholder="Rechercher" id="search-input" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <HeaderLink href="/favoris" url={Favoris} alt='favoris'/>
        <Link to={`/panier/${id}`} className="p-2 text-center flex-1 text-[#A07E53]">
          <img src={Panier} alt='Panier' className="inline-block w-1/8 h-10 mr-2" />
          Panier
        </Link>

        {/* {token ? (
            <HeaderLink href="/profil" url={Pdp} alt='Profils'/>
          ) : (
            <a href="/login" className="p-2 text-center flex-1 text-[#A07E53]">
              Login
            </a>
          )} */}
        <Link to={`/profil/${id}`} className="p-2 text-center flex-1 text-[#A07E53]">
          <img src={Pdp} alt='Profil' className="inline-block w-1/8 h-10 mr-2" />
          profil
        </Link>

      </div>
    </header>
  )
}

export default Header
