import { useState } from 'react'
import Modal from '../../../components/modals/Modal'
import {
  Badge,
  HStack,
  Input,
  Stack,
  Tag,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { priorityConstant } from '../../../constants/priorityConstants'
import SelectMembers from './SelectMembers'

const TaskDetailsModal = ({
  projectDetails,
  updateTask,
  fields = [],
  onCancel,
  isOpen,
  setIsOpen,
  cancleText = 'Close',
  showSave = false,
  handleMembersChange,
  updateCard,
  setUpdateCard,
  handleFieldChange,
  updateTaskCard,
}) => {
  const [isEditModal, setIsEditModal] = useState(false)

  return (
    <Modal
      size='xl'
      fields={fields}
      onSave={updateTaskCard}
      onCancel={onCancel}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      showSave={isEditModal ? true : showSave}
      cancleText={cancleText}
    >
      <HStack
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        mb={'20px'}
      >
        <>
          {isEditModal ? (
            <Stack width={'100%'}>
              <Text fontWeight={'medium'}>Edit Title</Text>
              <Input
                fontWeight={500}
                fontSize={'20px'}
                pl='2'
                w={'100%'}
                value={updateCard.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
              />

              <HStack
                justifyContent={'space-between'}
                alignItems={'flex-start'}
                mt={4}
                flexWrap={'wrap'}
              >
                <VStack
                  alignItems={'flex-start'}
                  justifyContent={'flex-start'}
                  gap={2}
                >
                  <Text fontWeight={'medium'}>Edit Priority</Text>
                  <HStack textAlign={'left'}>
                    {priorityConstant.map((priority) => (
                      <Badge
                        key={priority.name}
                        cursor={'pointer'}
                        p={'5px 10px'}
                        fontWeight={600}
                        bg={priority.bgColor}
                        color={priority.color}
                        onClick={() =>
                          setUpdateCard((prev) => ({
                            ...prev,
                            priority: priority.name,
                          }))
                        }
                        border={
                          updateCard.priority === priority.name
                            ? `1px solid ${priority.color}`
                            : 'none'
                        }
                      >
                        {priority.name}
                      </Badge>
                    ))}
                  </HStack>
                </VStack>

                <VStack alignItems={'flex-start'} justifyContent={'flex-start'}>
                  <HStack>
                    <VStack align={'flex-start'} gap={2}>
                      <SelectMembers
                        onChange={handleMembersChange}
                        projectDetails={projectDetails}
                        assignedUsers={updateCard.assignedUsers}
                        isEditModal={isEditModal}
                      />
                    </VStack>
                  </HStack>
                </VStack>
              </HStack>
            </Stack>
          ) : (
            <HStack gap={'10px'}>
              <Text
                Text
                fontWeight={700}
                fontSize={'24px'}
                lineHeight={'32px'}
                color={'#1A202C'}
              >{`# ${updateTask?.title}`}</Text>
              <Badge
                cursor={'pointer'}
                p={'5px 10px'}
                fontWeight={600}
                bg={
                  updateTask.priority === 'Low'
                    ? '#F9EEE3'
                    : updateTask.priority === 'High'
                    ? '#FBF1F2'
                    : '#F0F4FF'
                }
                color={
                  updateTask.priority === 'Low'
                    ? '#D58D49'
                    : updateTask.priority === 'High'
                    ? '#D8727D'
                    : '#4B7BE5'
                }
              >
                {updateTask.priority}
              </Badge>
            </HStack>
          )}
        </>
        {!isEditModal && (
          <Badge
            onClick={() => setIsEditModal(true)}
            py={1}
            mr={3}
            mt={2}
            fontSize={'14px'}
            cursor={'pointer'}
            px={2}
          >
            Edit
          </Badge>
        )}
      </HStack>
      {isEditModal ? (
        <>
          <Text fontWeight={'medium'}>Edit Description</Text>
          <Textarea
            rows={10}
            cols={20}
            pl='2'
            value={updateCard.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
          />
        </>
      ) : (
        <>
          <Text
            maxH={'250px'}
            overflowY={'auto'}
            fontWeight={400}
            fontSize={'16px'}
          >
            {updateTask.description}
          </Text>
          {updateTask.assignedUsers.length > 0 && (
            <HStack flexWrap={'wrap'} mt={4} width='100%'>
              <Text fontWeight={'500'} fontSize={'14px'}>
                Assigned Members:-
              </Text>
              <HStack flexWrap={'wrap'} align={'flex-start'}>
                {updateTask.assignedUsers.map((user) => (
                  <Tag.Root key={user._id} size={'lg'} p={1} variant='solid'>
                    <Tag.Label>{user.name}</Tag.Label>
                  </Tag.Root>
                ))}
              </HStack>
            </HStack>
          )}
        </>
      )}
    </Modal>
  )
}

export default TaskDetailsModal
