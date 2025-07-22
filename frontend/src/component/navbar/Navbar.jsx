import './navbar.scss'
import search from '../../assets/logos/search.svg'
import calender from '../../assets/logos/calender.svg'
import notification from '../../assets/logos/notification.svg'
import faq from '../../assets/logos/faq.svg'
import downArrow from '../../assets/logos/downArrow.svg'
import { ColorModeButton } from '../../components/ui/color-mode'
import { Button, Menu, Portal } from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const { logout } = useAuth()
  const getInitials = (name = '') => {
    const names = name.trim().split(' ')
    if (names.length === 0) return ''
    if (names.length === 1) return names[0][0].toUpperCase()
    return (names[0][0] + names[names.length - 1][0]).toUpperCase()
  }

  return (
    <div className='navbar'>
      <div className='searchBar'>
        <img src={search} alt='search' />
        <input placeholder='Search for anything...' type='text' />
      </div>
      <div className='rightSide'>
        <div className='icons'>
          <img src={calender} alt='' />
          <img src={faq} alt='' />
          <img src={notification} alt='' />
        </div>
        <div className='profile'>
          <p className='profile__name'>{user.displayName}</p>
          <p className='profile__image'>{getInitials(user.displayName)}</p>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button as={'p'} variant='plain' size='sm'>
                <img src={downArrow} alt='' />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content p={2}>
                  <Menu.Item
                    p={2}
                    cursor={'pointer'}
                    _hover={{ bg: '#C4C4C4' }}
                    onClick={logout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          <ColorModeButton />
        </div>
      </div>
    </div>
  )
}

export default Navbar
