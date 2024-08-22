import { NavLink } from 'react-router-dom'
interface NavLinkProps {
  href: string
  children: React.ReactNode
  isActive: boolean
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const CustomNavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `px-4 py-2 rounded-full transition-colors duration-200 ${
          isActive ? 'bg-green-400 text-green border border-green'  : 'text-[#A07E53]'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default CustomNavLink
