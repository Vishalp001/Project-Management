import { useState } from 'react'
import addCardImg from '../../assets/logos/addCard.svg'
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  HStack,
  Input,
  Menu,
  Portal,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { inviteUserApi } from '../../api/invite.api'
import { toast } from 'react-toastify'

const InviteUser = ({ projectDetails }) => {
  const [inviteLoader, setInviteLoader] = useState(false)
  const [inviteUser, setInviteUser] = useState({
    email: '',
    projectId: '',
    invitedBy: '',
  })

  const handleInviteUser = async () => {
    setInviteLoader(true)
    try {
      const res = await inviteUserApi(inviteUser)
      console.log(res)
      if (res.status === 200) {
        setInviteLoader(false)
        toast(res.data.message, {
          type: 'success',
        })
        setInviteUser((prev) => ({
          ...prev,
          email: '',
        }))
      }
    } catch (error) {
      console.log(error)
      toast(error.response.data.message, {
        type: 'error',
      })
      setInviteLoader(false)
    }
  }
  return (
    <>
      <HStack>
        <Menu.Root>
          <Menu.Trigger asChild>
            <HStack cursor={'pointer'}>
              <img src={addCardImg} alt='addCard' />
              <Text color={'#5030E5'}>Invite</Text>
            </HStack>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content p={2}>
                <VStack>
                  <Input
                    w={'300px'}
                    px={'2'}
                    placeholder='user@emaildomain.com'
                    onKeyDown={(e) => e.stopPropagation()}
                    type='email'
                    borderColor={'#5030E5'}
                    outline={'#5030E5'}
                    value={inviteUser.email}
                    onChange={(e) =>
                      setInviteUser((prev) => ({
                        ...prev,
                        email: e.target.value,
                        projectId: projectDetails?._id,
                        invitedBy: projectDetails?.owner?._id,
                      }))
                    }
                  />

                  <Button
                    w={'100%'}
                    color={'#5030E5'}
                    bg={'#DCD6FB'}
                    p={'10px'}
                    variant='unstyled'
                    onClick={handleInviteUser}
                  >
                    {inviteLoader ? <Spinner size='sm' /> : ' Invite User'}
                  </Button>
                  {projectDetails?.members?.length > 0 &&
                    projectDetails.members.map((member) => {
                      return (
                        <HStack key={member._id} w={'100%'}>
                          <Avatar.Root>
                            <Avatar.Fallback name={member.email} />
                          </Avatar.Root>
                          <Text>{member.email}</Text>
                        </HStack>
                      )
                    })}
                </VStack>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        {projectDetails.members.length > 0 && (
          <AvatarGroup gap='0' spaceX='-3' size='lg'>
            {projectDetails.members.map((member) => (
              <Avatar.Root>
                <Avatar.Fallback name={member.name} />
              </Avatar.Root>
            ))}
            {projectDetails.members.length > 4 && (
              <Avatar.Root color={'#D25B68'} bg={'#F4D7DA'} variant='solid'>
                <Avatar.Fallback>
                  {projectDetails.members.length - 3}
                </Avatar.Fallback>
              </Avatar.Root>
            )}
          </AvatarGroup>
        )}
      </HStack>
    </>
  )
}

export default InviteUser
