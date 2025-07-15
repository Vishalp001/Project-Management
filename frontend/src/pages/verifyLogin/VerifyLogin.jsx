import { useEffect, useState } from 'react'
import '../login/Login.scss'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
import { HStack, Separator, Text, VStack } from '@chakra-ui/react'
import login from '../../assets/login.svg'
import { FaArrowRightLong } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function VerifyLogin() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [newUser, setNewUser] = useState(true)
  const [user, setuser] = useState({
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
    providerId: 'emailLink',
    lastLoginAt: null,
  })

  useEffect(() => {
    const url = window.location.href
    const email = window.localStorage.getItem('emailForSignIn')

    if (isSignInWithEmailLink(auth, url) && email) {
      signInWithEmailLink(auth, email, url)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn')
          setuser({
            uid: result.user.uid,
            email: result.user.email,
            lastLoginAt: new Date(result.user.metadata.lastSignInTime),
          })
        })
        .catch((error) => {
          console.error('Login failed', error)
        })
    }
  }, [])

  console.log('UID:- ', user.uid)
  useEffect(() => {
    if (!user.uid) return // wait until uid is available

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/user/${user.uid}`
        )
        console.log('Response:- ', response)

        if (response.data) {
          console.log('Try code executed')
          setNewUser(false)
          console.log('response.data:- ', response.data)
          localStorage.setItem('user', JSON.stringify(response.data))
          navigate('/')
        } else {
          console.log('User not found, showing name input')
          setNewUser(true)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setNewUser(true) // fallback to new user state
      }
    }

    fetchUser()
  }, [user.uid])

  console.log('New User :-' + newUser)

  const createAccount = async (e) => {
    e.preventDefault()
    if (!name) {
      alert('Please enter your name')
      return
    }

    try {
      const payload = {
        uid: user.uid,
        email: user.email,
        displayName: name,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        providerId: user.providerId,
        lastLoginAt: user.lastLoginAt,
      }
      const response = await axios.post('http://localhost:5001/api/user', {
        payload,
      })
      console.log('response', response)
      localStorage.setItem('user', JSON.stringify(response.data))
      navigate('/')
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }

  return (
    <>
      {newUser && (
        <HStack className='loginPage'>
          <div className='colOne'>
            <div className='form'>
              <div>
                <h2>Almost there! What's your name?</h2>
              </div>
              <form action=''>
                <VStack className='inputGroup'>
                  <label htmlFor='name'>Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    id='name'
                    placeholder='Enter your name'
                  />
                </VStack>

                <HStack
                  justifyContent={'space-between'}
                  flexWrap={'wrap'}
                  w='100%'
                >
                  <button onClick={createAccount} className='signInButton'>
                    Sumbit <FaArrowRightLong />
                  </button>
                </HStack>
              </form>
            </div>
          </div>
          <div className='colTwo'>
            <img src={login} alt='login image' />
          </div>
        </HStack>
      )}
    </>
  )
}
