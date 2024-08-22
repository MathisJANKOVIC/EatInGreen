import { useState } from 'react'
import NavLink from '../link/NavLink'

function NavBar() {
  const [activePage, setActivePage] = useState<string | null>(null)

  const handleSetActivePage = (href: string) => {
    setActivePage(href)
  }

  return (
    <div className="flex justify-center items-center py-2">
      <div className="bg-white rounded-full w-[95%]  px-6 py-3 shadow-md flex justify-around">
        <NavLink href="/best-sellers" isActive={activePage === '/best-sellers'} onClick={() => handleSetActivePage('/best-sellers')}>
          Meilleures ventes
        </NavLink>
        <NavLink href="/eco-friendly" isActive={activePage === '/eco-friendly'} onClick={() => handleSetActivePage('/eco-friendly')}>
          Plus écologiques
        </NavLink>
        <NavLink href="/top-rated" isActive={activePage === '/top-rated'} onClick={() => handleSetActivePage('/top-rated')}>
          Mieux notés
        </NavLink>
        <NavLink href="/buy-again" isActive={activePage === '/buy-again'} onClick={() => handleSetActivePage('/buy-again')}>
          Acheter à nouveau
        </NavLink>
        <NavLink href="/flash-sales" isActive={activePage === '/flash-sales'} onClick={() => handleSetActivePage('/flash-sales')}>
          Ventes flash
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar
