import Logo from '../../assets/Logo.png';
import SearchInputForm from '../../components/input/SearchBar';
import Pdp from '../../assets/Pdp.png';
import Panier from '../../assets/Panier.png'
import Favoris from '../../assets/Favoris.png'
import HeaderLink from '../../components/link/HeaderLink'

function Header() {
  return (
    <header className="absolute top-0 left-0 w-full flex justify-between items-center p-4 bg-customWhite z-10">

      <div className="flex items-center space-x-4 w-full max-w-screen-lg mx-auto">
        <a href="/"><img src={Logo} alt="EatInGreen" className="h-16" /></a> 

        <SearchInputForm
          placeholder="Rechercher"
          id="search-input"
        />
      </div>

      <div className="flex items-center object-right w-full">
        <HeaderLink href="/favoris" url={Favoris} alt='favoris'/>
        <HeaderLink href="/panier" url={Panier} alt='Panier'/>
        <HeaderLink href="/profil" url={Pdp} alt='Profils'/>
      </div>
    </header>
  );
}

export default Header;
