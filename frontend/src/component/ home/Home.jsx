import {
  Badge,
  HStack,
  Text,
  Stack,
  Menu,
  Portal,
  AvatarGroup,
  Avatar,
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
import AddEditProjectModal from './homeComponents/AddEditProjectModal'
import TaskDetailsModal from './homeComponents/TaskDetailsModal'
import InviteUser from '../inviteusers/InviteUser'
import { priorityConstant } from '../../constants/priorityConstants'
import CreateTaskModal from './homeComponents/CreateTaskModal'

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
        <CreateTaskModal
          newCard={newCard}
          setNewCard={setNewCard}
          addCard={addCard}
          isModalOpen={isModalOpen}
          handleMembersChange={handleMembersChange}
          projectDetails={projectDetails}
          priorityConstant={priorityConstant}
          setIsModalOpen={setIsModalOpen}
        />
        <Modal
          size={'xs'}
          title='Are you sure you want to delete this project?'
          onSave={() => handleDeletProject(projectDetails?._id)}
          isOpen={isDeletModalOpen}
          setIsOpen={setIsDeletModalOpen}
        />

        <AddEditProjectModal
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
          }}
          isOpen={isEditModalOpen}
          setIsOpen={setEditIsModalOpen}
          colorCode={handleColorCode}
        />

        <TaskDetailsModal
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
                                        {card.assignedUsers.length > 0 && (
                                          <AvatarGroup
                                            gap='0'
                                            spaceX='-3'
                                            size='lg'
                                          >
                                            {card.assignedUsers.map(
                                              (member) => (
                                                <Avatar.Root>
                                                  <Avatar.Fallback
                                                    name={member.name}
                                                  />
                                                </Avatar.Root>
                                              )
                                            )}
                                            {card.assignedUsers.length > 4 && (
                                              <Avatar.Root
                                                color={'#D25B68'}
                                                bg={'#F4D7DA'}
                                                variant='solid'
                                              >
                                                <Avatar.Fallback>
                                                  {card.assignedUsers.length -
                                                    3}
                                                </Avatar.Fallback>
                                              </Avatar.Root>
                                            )}
                                          </AvatarGroup>
                                        )}
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
