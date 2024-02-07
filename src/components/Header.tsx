import Logo from '../assets/logo.svg'
import Dropdown from './Dropdown'
import PlusSvg from '../assets/plus.svg'
import UserSvg from '../assets/user.svg'
import SearchSvg from '../assets/search.svg'

const Header: React.FC = () => {
  const categoriesArr = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
  const languageArr = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'sv', 'ud', 'zh']

  return (
    <div className='flex justify-between items-center relative mb-4'>
      <a href='/'>
        <img src={Logo} className='logo' alt='Vite logo' />
      </a>

      <div className='flex flex-row justify-between items-center gap-x-8'>
        <a href='/' className='flex mr-2'>
          <img src={PlusSvg} alt="" />
          <span>Offer my News</span>
        </a>
        <Dropdown title='Categories' options={categoriesArr} />
        <Dropdown title='English' options={languageArr} />
        <a href='/' className='flex'>
          <img src={UserSvg} className='mr-2' alt="" />
          <span>Profile</span>
        </a>
        <a href='/' className='flex'>
          <img src={SearchSvg} className='mr-2' alt="" />
          <span>Searching</span>
        </a>
      </div>

      <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-[-10px] w-screen bg-gray-300 h-px'></div>
    </div>
  )
}

export default Header