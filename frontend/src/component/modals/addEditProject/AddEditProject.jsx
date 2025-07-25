import React from 'react'
import Modal from '../../../components/modals/Modal'
import { HStack } from '@chakra-ui/react'
import { Colorpicker } from '../../../components/ui/color-picker'

const AddEditProject = ({
  title,
  fields = [],
  // cancleText = 'Cancle',
  // saveText = 'Save',
  onSave,
  onCancel,
  isOpen,
  colorCode,
  setIsOpen,
  // children,
  // size = 'md',
}) => {
  return (
    <Modal
      title={title}
      fields={fields}
      onSave={onSave}
      onCancel={onCancel}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <HStack>
        <Colorpicker colorCode={colorCode} />
      </HStack>
    </Modal>
  )
}

export default AddEditProject
