import Logo from '../assets/logo.svg'
import Dropdown from './Dropdown'
import Search from './Search'

const Header = () => {
  const categoriesArr = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
  const languageArr = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'sv', 'ud', 'zh']
  
  return (
    <div className='flex justify-between items-center relative'>
      <a href="/">
        <img src={Logo} className="logo" alt="Vite logo" />
      </a>

      <div className="flex flex-row justify-between items-center gap-x-12">
        <Dropdown title='Categories' options={categoriesArr} />
        <Search/>
        <Dropdown title='Language' options={languageArr} />
        <div>Profile</div>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-[-10px] w-screen bg-gray-300 h-px"></div>
    </div>
  )
}

export default Header