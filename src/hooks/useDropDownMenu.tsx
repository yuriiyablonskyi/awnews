import { User, useAuth0 } from '@auth0/auth0-react'
import {
  ArrowLeftStartOnRectangleIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { DropDownMenu, DropdownData } from '../store/articles/articlesTypes'

const useDropDownMenu = (): DropDownMenu => {
  const { logout, user } = useAuth0<User>()
  const navigate: NavigateFunction = useNavigate()
  const handleSignOut: () => Promise<void> = () => logout({ logoutParams: { returnTo: window.location.origin } })
  const handleNavigate: () => void = () => navigate('/profile')

  const userItems: DropdownData = {
    wpapperStyle: 'relative inline-block text-left',
    menuButtonIcon: { img: user?.picture, style: 'h-10 w-10 rounded-full' },
    data: [
      {
        name: 'Your Profile',
        icon: UserIcon,
        action: handleNavigate,
      },
      {
        name: 'Sign out',
        icon: ArrowLeftStartOnRectangleIcon,
        action: handleSignOut,
      },
    ],
  }

  const articlesItems: DropdownData = {
    wpapperStyle: 'absolute top-0 right-0 text-right',
    menuButtonIcon: { icon: EllipsisVerticalIcon, style: 'size-8 fill-gray-600' },
    data: [
      {
        name: 'Edit',
        icon: PencilIcon,
      },
      {
        name: 'Delete',
        icon: TrashIcon,
      },
    ],
  }
  return { userItems, articlesItems }
}

export default useDropDownMenu
