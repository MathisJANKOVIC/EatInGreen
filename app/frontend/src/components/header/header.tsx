import Logo from '../../assets/Logo.png';
import SearchInputForm from '../../components/input/SearchBar';
import Pdp from '../../assets/Pdp.png';
import Panier from '../../assets/Panier.png';
import Favoris from '../../assets/Favoris.png';
import HeaderLink from '../../components/link/HeaderLink';

function Header() {
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
        <HeaderLink href="/profil" url={Pdp} alt='Profils'/>
      </div>
    </header>
  );
}

export default Header;
