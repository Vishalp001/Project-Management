import React from 'react'
import Modal from '../../../components/modals/Modal'
import { HStack } from '@chakra-ui/react'
import { Colorpicker } from '../../../components/ui/color-picker'

const AddEditProject = ({
  title,
  fields = [],
  onSave,
  onCancel,
  isOpen,
  isEdit = false,
  setIsOpen,
  onColorChange,
  colorCode,
}) => {
  return (
    <Modal
      title={title}
      fields={fields}
      onSave={onSave}
      onCancel={onCancel}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      saveText={'Update'}
    >
      <HStack>
        <Colorpicker
          colorCode={colorCode}
          isEdit={isEdit}
          onColorChange={onColorChange}
        />
      </HStack>
    </Modal>
  )
}

export default AddEditProject
