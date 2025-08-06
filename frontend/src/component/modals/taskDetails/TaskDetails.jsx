import React from 'react'
import Modal from '../../../components/modals/Modal'
import { Badge, HStack, Text } from '@chakra-ui/react'

const TaskDetails = ({
  updateTask,
  fields = [],
  // cancleText = 'Cancle',
  // saveText = 'Save',
  onSave,
  onCancel,
  isOpen,

  setIsOpen,
  // children,
  // size = 'md',
}) => {
  return (
    <Modal
      size='lg'
      fields={fields}
      onSave={onSave}
      onCancel={onCancel}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <HStack
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        mb={'20px'}
      >
        <Text
          Text
          fontWeight={700}
          fontSize={'24px'}
          lineHeight={'32px'}
          mb={'10px'}
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

      <Text mb={'10px'} fontWeight={400} fontSize={'16px'} lineHeight={'25px'}>
        {updateTask.description}
      </Text>
    </Modal>
  )
}

export default TaskDetails
