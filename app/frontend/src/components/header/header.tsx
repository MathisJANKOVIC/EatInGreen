import Logo from '../../assets/Logo.png'
import { useState, useEffect } from 'react'
import SearchInputForm from '../../components/input/SearchBar'
import Pdp from '../../assets/Pdp.png'
import Panier from '../../assets/Panier.png'
import Favoris from '../../assets/Favoris.png'
import HeaderLink from '../../components/link/HeaderLink'

function Header() {
  const [token, setToken] = useState<string | null>(null)

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
        <HeaderLink href="/panier" url={Panier} alt='Panier'/>
        {token ? (
          <HeaderLink href="/profil" url={Pdp} alt='Profils'/>
        ) : (
          <a href="/login" className="p-2 text-center flex-1 text-[#A07E53]">
            Login
          </a>
        )}
      </div>
    </header>
  )
}

export default Header
