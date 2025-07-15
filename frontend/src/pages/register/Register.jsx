import './Register.scss'
import { HStack, Separator, Text, VStack } from '@chakra-ui/react'
import register from '../../assets/register.svg'
import { FaArrowRightLong } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <HStack className='registerPage'>
      <div className='colTwo'>
        <img src={register} alt='Register image' />
      </div>
      <div className='colOne'>
        <div className='form'>
          <h2>Create Your Account</h2>
          <form action=''>
            <VStack className='inputGroup'>
              <label htmlFor='name'>Full Name</label>
              <input type='name' id='name' placeholder='Enter your full name' />
            </VStack>
            <VStack className='inputGroup'>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' placeholder='Enter your email' />
            </VStack>
            <VStack className='inputGroup'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Enter your password'
              />
            </VStack>
            <HStack flexWrap={'wrap'} justifyContent={'space-between'} w='100%'>
              <button className='signInButton'>
                Create Account
                <FaArrowRightLong />
              </button>
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
