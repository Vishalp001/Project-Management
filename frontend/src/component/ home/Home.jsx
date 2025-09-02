import {
  Badge,
  HStack,
  Text,
  Stack,
  Menu,
  Portal,
  Button,
  Select,
  VStack,
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
import { MdDeleteOutline } from 'react-icons/md'
import HomeHandler from './HomeFunction'
import AddEditProject from '../modals/addEditProject/AddEditProject'
import TaskDetails from '../modals/taskDetails/TaskDetails'
import InviteUser from '../inviteusers/InviteUser'
import { priorityConstant } from '../../constants/priorityConstants'
import SelectMembers from './homeComponents/SelectMembers'

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
    isDeletModalOpen,
    setIsDeletModalOpen,
    isEditModalOpen,
    setEditIsModalOpen,
    handleEditProject,
    handleColorCode,
    openEditProjectModal,
    editProject,
    setEditProject,
    handleDeleteTask,
    handleTaskDetails,
    isTaskDetailsModalOpen,
    setIsTaskDetailsModalOpen,
    updateTask,
    isProjectOwner,
    handleMembersChange,
  } = HomeHandler()

  return (
    <>
      <div className='homeHeader'>
        <Modal
          size='xl'
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
          <HStack align={'flex-start'} justifyContent={'space-between'}>
            <VStack alignItems={'flex-start'}>
              <Text fontWeight={'medium'} mb={2}>
                Add Priority
              </Text>
              <HStack>
                {priorityConstant.map((priority) => (
                  <Badge
                    key={priority.name}
                    cursor={'pointer'}
                    p={'5px 10px'}
                    fontWeight={600}
                    bg={priority.bgColor}
                    color={priority.color}
                    onClick={() =>
                      setNewCard((prev) => ({
                        ...prev,
                        priority: priority.name,
                      }))
                    }
                    border={
                      newCard.priority === priority.name
                        ? `1px solid ${priority.color}`
                        : 'none'
                    }
                  >
                    {priority.name}
                  </Badge>
                ))}
              </HStack>
              <HStack
                alignItems={'center'}
                justifyContent={'center'}
                mt={4}
                gap={2}
              >
                <Text fontWeight={'medium'}>Owner:</Text>
                <Badge>{projectDetails?.owner?.name}</Badge>
              </HStack>
            </VStack>

            <VStack>
              <HStack>
                <VStack align={'flex-start'} mt={4} gap={2}>
                  <SelectMembers
                    onChange={handleMembersChange}
                    projectDetails={projectDetails}
                  />
                </VStack>
              </HStack>
            </VStack>
          </HStack>
        </Modal>
        <Modal
          size={'xs'}
          title='Are you sure you want to delete this project?'
          onSave={() => handleDeletProject(projectDetails?._id)}
          isOpen={isDeletModalOpen}
          setIsOpen={setIsDeletModalOpen}
        />

        <AddEditProject
          title='Edit Project'
          fields={[
            {
              label: 'Add Title',
              placeholder: 'Enter Title',
              value: editProject?.title,
              onChange: (val) =>
                setEditProject((prev) => ({ ...prev, title: val })),
            },
          ]}
          onSave={handleEditProject}
          onCancel={() => {
            setEditProject({ title: '' })
            // optional: reset form
          }}
          isOpen={isEditModalOpen}
          setIsOpen={setEditIsModalOpen}
          colorCode={handleColorCode}
        />

        <TaskDetails
          updateTask={updateTask}
          title='Project Details'
          isOpen={isTaskDetailsModalOpen}
          setIsOpen={setIsTaskDetailsModalOpen}
        />
        <Sidebar updateProject={updateProject} />
        <div className='homeContainer'>
          <Navbar />
          <div className='homeContent'>
            {projectDetails !== null ? (
              <>
                <HStack
                  flexWrap={'wrap'}
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
                    {isProjectOwner && (
                      <HStack gap={'1rem'}>
                        <img
                          onClick={() =>
                            openEditProjectModal(projectDetails?._id)
                          }
                          src={edit}
                          alt='edit'
                        />
                        <Stack
                          cursor={'pointer'}
                          onClick={() => setIsDeletModalOpen(true)}
                          bg='#DCD6FA'
                          p='5px'
                          borderRadius='25%'
                        >
                          <MdDeleteOutline color='#EB092F' />
                        </Stack>
                      </HStack>
                    )}
                  </HStack>
                  <HStack className='homeHeaderRight'>
                    <InviteUser projectDetails={projectDetails} />
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
                                  {({ listeners, attributes }) => (
                                    <Stack
                                      onClick={() =>
                                        handleTaskDetails(card._id)
                                      }
                                      className='card'
                                    >
                                      <div {...listeners} {...attributes}>
                                        <div className='dragIcon' />
                                      </div>

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

                                        <Menu.Root>
                                          <Menu.Trigger asChild>
                                            <div
                                              onPointerDown={(e) =>
                                                e.stopPropagation()
                                              }
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <SlOptions cursor={'pointer'} />
                                            </div>
                                          </Menu.Trigger>
                                          <Portal>
                                            <Menu.Positioner>
                                              <Menu.Content p={2}>
                                                <Menu.Item
                                                  p={2}
                                                  cursor={'pointer'}
                                                  _hover={{ bg: '#C4C4C4' }}
                                                  onPointerDown={(e) =>
                                                    e.stopPropagation()
                                                  }
                                                  onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDeleteTask(card._id)
                                                  }}
                                                >
                                                  Delete
                                                </Menu.Item>
                                              </Menu.Content>
                                            </Menu.Positioner>
                                          </Portal>
                                        </Menu.Root>
                                      </div>
                                      <div>
                                        <h3 className='title'>{card.title}</h3>
                                        <p className='desc'>
                                          {card.description.split(' ').length >
                                          23
                                            ? card.description
                                                .split(' ')
                                                .slice(0, 23)
                                                .join(' ') + '...'
                                            : card.description}
                                        </p>
                                      </div>
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
                                    </Stack>
                                  )}
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
