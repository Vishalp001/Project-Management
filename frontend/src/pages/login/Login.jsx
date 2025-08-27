import './login.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import {
  Button,
  HStack,
  Separator,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import loginSvg from '../../assets/login.svg'
import { FaArrowRightLong } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { loginApi } from '../../api/user.api'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'

const Login = () => {
  const { login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'
  const [userDeatails, setUserDetails] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await loginApi(userDeatails)
      if (res.status === 200) {
        login(res.data.user)
        setLoading(false)
        navigate(from, { replace: true }) // Redirect to the page user was trying to access
        toast(res.data.message, {
          type: 'success',
        })
      }
    } catch (error) {
      setLoading(false)
      toast(error.response.data.message, {
        type: 'error',
      })
      console.log(error.response.data.message)
    }
  }

  return (
    <HStack className='loginPage'>
      <div className='colOne'>
        <div className='form'>
          <div>
            <h2>Enter your credentials to access your workspace.</h2>
            <Text textAlign={'center'}>
              Fast lane to your workspace—enter and you’re in.
            </Text>
          </div>
          <form action=''>
            <VStack className='inputGroup'>
              <label htmlFor='email'>Email</label>
              <input
                value={userDeatails.email}
                onChange={(e) =>
                  setUserDetails((prev) => ({ ...prev, email: e.target.value }))
                }
                type='email'
                id='email'
                placeholder='Enter your email'
              />
            </VStack>

            <VStack className='inputGroup'>
              <label htmlFor='password'>Password</label>
              <input
                value={userDeatails.password}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                type='password'
                id='password'
                placeholder='Enter your password'
              />
            </VStack>

            <HStack flexWrap={'wrap'} justifyContent={'space-between'} w='100%'>
              <Button
                w={'170px'}
                onClick={handleLogin}
                className='signInButton'
              >
                <span>{loading ? <Spinner /> : 'Sign In'}</span>{' '}
                <FaArrowRightLong />
              </Button>
              <Text mt={'10px'} className='loginLink'>
                Create a new account? <Link to='/register'>Sign Up</Link>
              </Text>
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
        <img src={loginSvg} alt='login image' />
      </div>
    </HStack>
  )
}

export default Login
