import Logo from '../assets/logo.svg'
import Dropdown from './Dropdown'

const Header = () => {
  const categoriesArr = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
  const languageArr = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'sv', 'ud', 'zh']
  
  return (
    <div>
      <a href="/">
        <img src={Logo} className="logo" alt="Vite logo" />
      </a>

      <div className="links">
        <Dropdown title='Categories' options={categoriesArr} />
        <div>Searching</div>
        <div>Profile</div>
        <Dropdown title='Language' options={languageArr} />
      </div>
    </div>
  )
}

export default Header