import React from 'react'
import Modal from '../../../components/modals/Modal'
import { Badge, HStack, Text, VStack } from '@chakra-ui/react'
import SelectMembers from './SelectMembers'

const CreateTaskModal = ({
  newCard,
  setNewCard,
  addCard,
  isModalOpen,
  handleMembersChange,
  projectDetails,
  priorityConstant,
  setIsModalOpen,
}) => {
  return (
    <Modal
      size='xl'
      title='Create Card'
      fields={[
        {
          label: 'Add Title',
          placeholder: 'Enter Title',
          value: newCard.title,
          onChange: (val) => setNewCard((prev) => ({ ...prev, title: val })),
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
  )
}

export default CreateTaskModal
