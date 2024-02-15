import Logo from '../assets/logo.svg'
import Dropdown from './Dropdown'
import PlusSvg from '../assets/plus.svg'
import UserSvg from '../assets/user.svg'
import SearchSvg from '../assets/search.svg'
import Container from './Container'
import { FC } from 'react'


const Header: FC = () => {
  const categoriesArr = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
  const languageArr = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'sv', 'ud', 'zh']

  return (
    <div className='border-solid border-y-platinum border-b-2 py-2.5'>
      <Container styles='flex justify-between items-center'>
        <a href='/'>
          <img src={Logo} className='max-w-24 h-7' alt='Vite logo' />
        </a>

        <div className='flex flex-row justify-between items-center gap-x-8'>
          <a href='/' className='flex mr-2'>
            <img src={PlusSvg} alt='' />
            <span className='font-serif font-semibold text-xl'>Offer my News</span>
          </a>
          <Dropdown title='Categories' options={categoriesArr} />
          <Dropdown title='English' options={languageArr} />
          <a href='/' className='flex'>
            <img src={UserSvg} className='mr-2' alt='' />
            <span className='font-serif font-semibold text-xl'>Profile</span>
          </a>
          <a href='/' className='flex' >
            <img src={SearchSvg} className='mr-2' alt='' />
            <span className='font-serif font-semibold text-xl'>Searching</span>
          </a>
        </div>
      </Container>
    </div>
  )
}

export default Header