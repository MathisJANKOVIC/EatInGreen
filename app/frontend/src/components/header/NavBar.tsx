import NavLink from "../link/NavLink";

function NavBar() {
  return (
    <nav className="flex justify-center items-center py-2">
      <div className="bg-white rounded-full w-[90%] max-w-6xl px-6 py-3 shadow-md flex justify-around">
        <NavLink href="/best-sellers" > Meilleures ventes </NavLink>
        <NavLink href="/eco-friendly" > Plus écologiques </NavLink>
        <NavLink href="/top-rated" > Mieux notés </NavLink>
        <NavLink href="/buy-again" > Acheter à nouveau </NavLink>
        <NavLink href="/flash-sales" > Ventes flash </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
