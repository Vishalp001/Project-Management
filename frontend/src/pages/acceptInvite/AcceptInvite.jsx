import React, { useEffect, useState } from 'react'
import './acceptInvite.scss'
import { Avatar, Button, Text, HStack, Stack } from '@chakra-ui/react'
import { acceptInviteApi, verifyInviteApi } from '../../api/invite.api'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'

const AcceptInvite = () => {
  const [rightUser, setrightUser] = useState(true)
  const [wrongEmail, setwrongEmail] = useState('')
  const navigate = useNavigate()
  const { logout } = useAuth()

  const { inviteToken } = useParams()
  const { user } = useAuth()

  useEffect(() => {
    const verifyInvite = async () => {
      try {
        const res = await verifyInviteApi(inviteToken, { email: user?.email })

        if (res.data.status === 'accepted') {
          toast('You have already accepted the invite', { type: 'info' })
          navigate('/')
        }
      } catch (error) {
        console.log(error, 'error')
        setrightUser(false)
        setwrongEmail(error.response.data.email)
        toast(error.response.data.message, {
          type: 'error',
        })
      }
    }

    verifyInvite()
  }, [inviteToken, navigate, user?.email])

  const handleAcceptInvite = async () => {
    try {
      const res = await acceptInviteApi({ token: inviteToken })
      console.log(res.data.invitation.status, 'res')
      if (res.data.invitation.status === 'accepted') {
        toast('Invite accepted successfully', { type: 'success' })
        navigate('/')
      }
    } catch (error) {
      console.log(error, 'error')
      toast(error.response.data.message, {
        type: 'error',
      })
    }
  }

  return (
    <div className='acceptInvite'>
      <Stack bg={'#fff'} p={8} borderRadius='md' spacing={4}>
        {rightUser ? (
          <Stack>
            <Text fontSize={'14px'} color={'gray'}>
              Today, April 10, 2024
            </Text>
            <Text fontSize={'20px'} color={'black'}>
              Pending invite
            </Text>
            <HStack justifyContent={'center'}>
              <Avatar.Root bg={'#2787CD'} w={'65px'} h={'65px'}>
                <Avatar.Fallback fontSize={'25px'} color='#fff' name='Suresh' />
              </Avatar.Root>
            </HStack>

            <Text
              margin={'0 auto'}
              textAlign={'center'}
              fontSize={'22px'}
              color={'black'}
            >
              <b> Sarha Johnson </b> invited you to the project <br /> "Strategy
              2024"
            </Text>
            <HStack w={'100%'} justifyContent={'center'}>
              <Text
                maxW={'80%'}
                textAlign={'center'}
                fontSize={'18px'}
                color={'black'}
              >
                Strategy 2024 is a project to plan and execute goals for the
                organization in 2024.
              </Text>
            </HStack>

            <HStack mt={4} justifyContent={'flex-end'}>
              <HStack>
                <Button
                  bg={'transparent'}
                  color={'#000'}
                  border={'1px solid gray'}
                  rounded={'md'}
                  _hover={{ bg: '#f0f0f0' }}
                  _active={{ bg: '#e0e0e0' }}
                  _focus={{ boxShadow: 'none' }}
                  mr={2}
                  p={'10px'}
                  fontSize={'18px'}
                  onClick={() => navigate('/')}
                >
                  Decline
                </Button>
                <Button
                  bg={'#00886E'}
                  color={'#fff'}
                  border={'1px solid gray'}
                  rounded={'md'}
                  _hover={{ bg: '#005747ff' }}
                  p={'10px'}
                  fontSize={'18px'}
                  onClick={handleAcceptInvite}
                >
                  Accept inviation
                </Button>
              </HStack>
            </HStack>
          </Stack>
        ) : (
          <Stack>
            <Text fontSize={'14px'} color={'gray'}>
              Today, April 10, 2024
            </Text>
            <Text fontSize={'20px'} color={'black'}>
              Pending invite
            </Text>
            <HStack justifyContent={'center'}>
              <Avatar.Root bg={'#2787CD'} w={'65px'} h={'65px'}>
                <Avatar.Fallback fontSize={'25px'} color='#fff' name='Suresh' />
              </Avatar.Root>
            </HStack>

            <Text
              margin={'0 auto'}
              textAlign={'center'}
              fontSize={'18px'}
              color={'black'}
            >
              This invite was sent to <b> {wrongEmail}</b>, <br /> but you’re
              logged in as <b>{user.email}</b>. <br /> Please log in with the
              correct account to accept this invite.
            </Text>

            <HStack mt={4} justifyContent={'flex-end'}>
              <HStack>
                <Button
                  bg={'transparent'}
                  color={'#000'}
                  border={'1px solid gray'}
                  rounded={'md'}
                  _hover={{ bg: '#f0f0f0' }}
                  _active={{ bg: '#e0e0e0' }}
                  _focus={{ boxShadow: 'none' }}
                  mr={2}
                  p={'10px'}
                  fontSize={'18px'}
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
                <Button
                  bg={'#00886E'}
                  color={'#fff'}
                  border={'1px solid gray'}
                  rounded={'md'}
                  _hover={{ bg: '#005747ff' }}
                  p={'10px'}
                  fontSize={'18px'}
                  onClick={logout}
                >
                  Logout
                </Button>
              </HStack>
            </HStack>
          </Stack>
        )}
      </Stack>
    </div>
  )
}

export default AcceptInvite
