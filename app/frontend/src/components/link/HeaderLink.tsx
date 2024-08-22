interface HeaderLinkProps {
  href: string
  url: string
  alt: string
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ href, url, alt }) => {
  return (
    <div >
      <a href={href} className="p-2 text-center flex-1 text-[#A07E53]">
        <img src={url} alt={alt} className="inline-block w-1/8 h-10 mr-2" />
        {alt}
      </a>
    </div>
  )
}

export default HeaderLink
