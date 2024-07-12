import { useAuth0 } from '@auth0/auth0-react'
import {
  EllipsisVerticalIcon,
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { removeArticle } from '../store/articles/articlesSlice'
import { useDispatch } from 'react-redux'

const useDropDownMenu = () => {
  const { logout, user } = useAuth0()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = '23'
  const handleSignOut = () => logout({ logoutParams: { returnTo: window.location.origin } })
  const handleNavigate = () => navigate('/profile')
  const handleRemoveArticle = () => dispatch(removeArticle(id))
  const handleEdit = () => console.log('edit')

  const userItems = {
    wpapperStyle: 'relative inline-block text-left',
    MenuButtonIcon: { img: user?.picture, style: 'h-10 w-10 rounded-full' },
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

  const articlesItems = {
    wpapperStyle: 'absolute top-0 right-0 text-right',
    MenuButtonIcon: { icon: EllipsisVerticalIcon, style: 'size-8 fill-gray-600' },
    data: [
      {
        name: 'Edit',
        icon: PencilIcon,
        action: handleEdit,
      },
      {
        name: 'Delete',
        icon: TrashIcon,
        action: handleRemoveArticle,
      },
    ],
  }
  return { userItems, articlesItems }
}

export default useDropDownMenu
