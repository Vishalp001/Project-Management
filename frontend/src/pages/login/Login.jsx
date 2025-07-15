import './login.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../../firebase'
import { sendSignInLinkToEmail } from 'firebase/auth'

import { HStack, Separator, Text, VStack } from '@chakra-ui/react'
import login from '../../assets/login.svg'
import { FaArrowRightLong } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'

const actionCodeSettings = {
  url: 'http://localhost:5173/verify', // change this for production
  handleCodeInApp: true,
}

const Login = () => {
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      window.localStorage.setItem('emailForSignIn', email)
      alert('Login link sent! Check your inbox.')
    } catch (error) {
      console.error('Error sending link:', error.message)
    }
  }

  return (
    <HStack className='loginPage'>
      <div className='colOne'>
        <div className='form'>
          <div>
            <h2>Enter your email to access your workspace</h2>
            <Text textAlign={'center'}>
              We'll send you a magic link to log in.
            </Text>
          </div>
          <form action=''>
            <VStack className='inputGroup'>
              <label htmlFor='email'>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                id='email'
                placeholder='Enter your email'
              />
            </VStack>

            <HStack justifyContent={'space-between'} flexWrap={'wrap'} w='100%'>
              <button onClick={handleLogin} className='signInButton'>
                Sign In <FaArrowRightLong />
              </button>
            </HStack>
          </form>
          <div className='separator'>
            <Separator />
            <p>Sign in with</p>
            <Separator />
          </div>
          <div className='socialButons'>
            <button className='googleButton'>
              <FcGoogle />
              Google
            </button>
          </div>
        </div>
      </div>
      <div className='colTwo'>
        <img src={login} alt='login image' />
      </div>
    </HStack>
  )
}

export default Login
