import './Register.scss'
import {
  Button,
  HStack,
  Separator,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import registerSvg from '../../assets/register.svg'
import { FaArrowRightLong } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { registerApi } from '../../api/user.api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await registerApi(userDetails)
      console.log(res)
      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data.data))
        register(res.data.data)
        setLoading(false)
        navigate('/')
        toast(res.data.message, {
          type: 'success',
        })
      }
    } catch (error) {
      setLoading(false)
      toast(error.response.data.error, {
        type: 'error',
      })
      console.log(error)
    }
  }

  return (
    <HStack className='registerPage'>
      <div className='colTwo'>
        <img src={registerSvg} alt='Register image' />
      </div>
      <div className='colOne'>
        <div className='form'>
          <h2>Create Your Account</h2>
          <form action=''>
            <VStack className='inputGroup'>
              <label htmlFor='name'>Full Name</label>
              <input
                value={userDetails.name}
                type='name'
                id='name'
                placeholder='Enter your full name'
                onChange={(e) =>
                  setUserDetails((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </VStack>
            <VStack className='inputGroup'>
              <label htmlFor='email'>Email</label>

              <input
                value={userDetails.email}
                type='email'
                id='email'
                placeholder='Enter your email'
                onChange={(e) =>
                  setUserDetails((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </VStack>
            <VStack className='inputGroup'>
              <label htmlFor='password'>Password</label>
              <input
                value={userDetails.password}
                type='password'
                id='password'
                placeholder='Enter your password'
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </VStack>
            <HStack flexWrap={'wrap'} justifyContent={'space-between'} w='100%'>
              <Button
                w={'170px'}
                onClick={(e) => handleSubmit(e)}
                className='signInButton'
              >
                <span>{loading ? <Spinner /> : 'Create Account'}</span>

                <FaArrowRightLong />
              </Button>
              <Text mt={'10px'} className='loginLink'>
                Already have an account? <Link to='/login'>Sign In</Link>
              </Text>
            </HStack>
          </form>
          <div className='separator'>
            <Separator />
            <p>Sign up with</p>
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
    </HStack>
  )
}

export default Register
