interface NavLinkProps {
    href: string;
    children: React.ReactNode;
  }
  
  const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    return (
      <a href={href} className="text-[#A07E53]">
        {children}
      </a>
    );
  };
  
  export default NavLink;
  