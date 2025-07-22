import {
  Badge,
  HStack,
  Text,
  Avatar,
  AvatarGroup,
  Stack,
} from '@chakra-ui/react'
import Sidebar from '../sidebar/Sidebar'
import './home.scss'
import Navbar from '../navbar/Navbar'
import { DndContext } from '@dnd-kit/core'
import { Draggable } from '../Draggable'
import { Droppable } from '../Droppable'
import addCardImg from '../../assets/logos/addCard.svg'
import comment from '../../assets/logos/comment.svg'
import files from '../../assets/logos/files.svg'
import { SlOptions } from 'react-icons/sl'
import Modal from '../../components/modals/Modal'
import edit from '../../assets/logos/edit.svg'
import link from '../../assets/logos/link.svg'
import { MdDeleteOutline } from 'react-icons/md'
import HomeHandler from './HomeFunction'

const Home = () => {
  const {
    handleDragStart,
    handleDragEnd,
    addCard,
    handleDeletProject,
    projectDetails,
    isModalOpen,
    setIsModalOpen,
    newCard,
    updateProject,
    setNewCard,
    columns,
  } = HomeHandler()
  return (
    <>
      <div className='homeHeader'>
        <Modal
          title='Create Card'
          fields={[
            {
              label: 'Add Title',
              placeholder: 'Enter Title',
              value: newCard.title,
              onChange: (val) =>
                setNewCard((prev) => ({ ...prev, title: val })),
            },
            {
              label: 'Add Description',
              placeholder: 'Enter Description',
              value: newCard.description,
              type: 'textarea',
              onChange: (val) =>
                setNewCard((prev) => ({ ...prev, description: val })),
            },
          ]}
          onSave={addCard}
          onCancel={() => {
            console.log('Modal cancelled')
            setNewCard({ title: '', description: '' }) // optional: reset form
          }}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        >
          <Text fontWeight={'medium'} mb={2}>
            Add Priority
          </Text>
          <HStack>
            <Badge
              cursor={'pointer'}
              p={'5px 10px'}
              fontWeight={600}
              bg='#F9EEE3'
              color='#D58D49'
              onClick={() =>
                setNewCard((prev) => ({ ...prev, priority: 'Low' }))
              }
              border={newCard.priority === 'Low' ? '1px solid #D58D49' : 'none'}
            >
              Low
            </Badge>
            <Badge
              cursor={'pointer'}
              p={'5px 10px'}
              fontWeight={600}
              bg='#FBF1F2'
              color='#D8727D'
              onClick={() =>
                setNewCard((prev) => ({ ...prev, priority: 'High' }))
              }
              border={
                newCard.priority === 'High' ? '1px solid #D8727D' : 'none'
              }
            >
              High
            </Badge>
            <Badge
              cursor={'pointer'}
              p={'5px 10px'}
              fontWeight={600}
              bg='#F0F4FF'
              color='#4B7BE5'
              onClick={() =>
                setNewCard((prev) => ({ ...prev, priority: 'Medium' }))
              }
              border={
                newCard.priority === 'Medium' ? '1px solid #4B7BE5' : 'none'
              }
            >
              Medium
            </Badge>
          </HStack>
        </Modal>
        <Sidebar updateProject={updateProject} />
        <div className='homeContainer'>
          <Navbar />
          <div className='homeContent'>
            {projectDetails !== null ? (
              <>
                <HStack
                  mb={'20px'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <HStack gap={'1rem'}>
                    <Text
                      fontWeight={'600'}
                      fontSize={'2.5rem'}
                      color={'#0D062D'}
                    >
                      {projectDetails?.title || 'Loading...'}
                    </Text>
                    <HStack gap={'1rem'}>
                      <img src={edit} alt='edit' />
                      <img src={link} alt='link' />
                      <Stack
                        cursor={'pointer'}
                        onClick={() => handleDeletProject(projectDetails?._id)}
                        bg='#DCD6FA'
                        p='5px'
                        borderRadius='25%'
                      >
                        <MdDeleteOutline color='#EB092F' />
                      </Stack>
                    </HStack>
                  </HStack>
                  <HStack className='homeHeaderRight'>
                    <HStack>
                      <img src={addCardImg} alt='addCard' />
                      <Text color={'#5030E5'}>Invite</Text>
                      <AvatarGroup gap='0' spaceX='-3' size='lg'>
                        <Avatar.Root>
                          <Avatar.Fallback name='Uchiha Sasuke' />
                          <Avatar.Image src='https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd' />
                        </Avatar.Root>

                        <Avatar.Root>
                          <Avatar.Fallback name='Baki Ani' />
                          <Avatar.Image src='https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c' />
                        </Avatar.Root>

                        <Avatar.Root>
                          <Avatar.Fallback name='Uchiha Chan' />
                          <Avatar.Image src='https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863' />
                        </Avatar.Root>
                        <Avatar.Root
                          color={'#D25B68'}
                          bg={'#F4D7DA'}
                          variant='solid'
                        >
                          <Avatar.Fallback>+3</Avatar.Fallback>
                        </Avatar.Root>
                      </AvatarGroup>
                    </HStack>
                  </HStack>
                </HStack>
                <div className='columnContainer'>
                  <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    {Object.keys(columns).map((columnName) => {
                      return (
                        <Droppable id={columnName} key={columnName}>
                          <div className='cardHeader'>
                            <div className='cardHeaderTitle'>
                              <div
                                className={
                                  'dot ' +
                                  (columnName === 'To Do'
                                    ? 'todo'
                                    : columnName === 'In Progress'
                                    ? 'onProcess'
                                    : 'done')
                                }
                              />
                              <h3>{columnName}</h3>
                              {columns[columnName].length > 0 && (
                                <p className='cardCount'>
                                  {columns[columnName].length}
                                </p>
                              )}
                            </div>

                            {columnName === 'To Do' && (
                              <button onClick={() => setIsModalOpen(true)}>
                                <img src={addCardImg} alt='addCard' />
                              </button>
                            )}
                          </div>
                          <div
                            className={
                              'bar ' +
                              (columnName === 'To Do'
                                ? 'todoBar'
                                : columnName === 'In Progress'
                                ? 'onProcessBar'
                                : 'doneBar')
                            }
                          />
                          <div className='columnContainerBox'>
                            {columns[columnName]
                              .slice()
                              .reverse()
                              .map((card) => (
                                <Draggable id={card._id} key={card._id}>
                                  <div className='card'>
                                    <div className='cardHeader'>
                                      <Badge
                                        cursor={'pointer'}
                                        p={'5px 10px'}
                                        fontWeight={600}
                                        bg={
                                          card.priority === 'Low'
                                            ? '#F9EEE3'
                                            : card.priority === 'High'
                                            ? '#FBF1F2'
                                            : '#F0F4FF'
                                        }
                                        color={
                                          card.priority === 'Low'
                                            ? '#D58D49'
                                            : card.priority === 'High'
                                            ? '#D8727D'
                                            : '#4B7BE5'
                                        }
                                      >
                                        {card.priority}
                                      </Badge>
                                      <SlOptions />
                                    </div>
                                    <h3 className='title'>{card.title}</h3>
                                    <p className='desc'>{card.description}</p>
                                    <div className='cardFooter'>
                                      <div className='profile'>
                                        <img
                                          src='https://i.pravatar.cc/150?img=3'
                                          alt='profile'
                                        />
                                        <img
                                          src='https://i.pravatar.cc/150?img=4'
                                          alt='profile'
                                        />
                                        <img
                                          src='https://i.pravatar.cc/150?img=5'
                                          alt='profile'
                                        />
                                      </div>
                                      <div className='fileAndComment'>
                                        <div className='comment'>
                                          <img src={comment} alt='comments' />
                                          <Text>12 </Text>
                                          <Text
                                            whiteSpace='nowrap'
                                            overflow='hidden'
                                            textOverflow='ellipsis'
                                            maxW='80px'
                                            display={{
                                              base: 'none',
                                              sm: 'block',
                                            }}
                                          >
                                            comments
                                          </Text>
                                        </div>
                                        <div className='file'>
                                          <img src={files} alt='files' />
                                          <Text>12 </Text>
                                          <Text
                                            whiteSpace='nowrap'
                                            overflow='hidden'
                                            textOverflow='ellipsis'
                                            maxW='80px'
                                            display={{
                                              base: 'none',
                                              sm: 'block',
                                            }}
                                          >
                                            files
                                          </Text>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Draggable>
                              ))}
                          </div>
                        </Droppable>
                      )
                    })}
                  </DndContext>
                </div>
              </>
            ) : (
              <Text>Add Project</Text>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
