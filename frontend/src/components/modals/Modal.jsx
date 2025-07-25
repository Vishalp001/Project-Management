import React, { useRef } from 'react'
import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  Textarea,
} from '@chakra-ui/react'

const Modal = ({
  title,
  fields = [],
  cancleText = 'Cancle',
  saveText = 'Save',
  onSave,
  onCancel,
  isOpen,
  setIsOpen,
  children,
  size = 'md',
}) => {
  const ref = useRef(null)

  const handleSave = () => {
    onSave?.()
    setIsOpen(false)
  }

  const handleCancel = () => {
    onCancel?.()
    setIsOpen(false)
  }

  return (
    <Stack zIndex={100}>
      <Dialog.Root
        size={size}
        open={isOpen}
        onOpenChange={setIsOpen}
        placement={'center'}
        initialFocusEl={() => ref.current}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content p='4'>
              <Dialog.Header>
                <Dialog.Title pb={2}> {title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap='4'>
                  {fields.map((field, index) => (
                    <Field.Root key={index}>
                      <Field.Label>{field.label}</Field.Label>
                      {field.type === 'textarea' ? (
                        <Textarea
                          rows={field.rows || 5}
                          cols={field.cols || 20}
                          ref={index === 0 ? ref : null}
                          pl='2'
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      ) : (
                        <Input
                          ref={index === 0 ? ref : null}
                          pl='2'
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      )}
                    </Field.Root>
                  ))}
                  {children && <div>{children}</div>}
                </Stack>
              </Dialog.Body>
              <Dialog.Footer mt={4}>
                {/* <Dialog.ActionTrigger asChild> */}
                <Button px={2} onClick={handleCancel} variant='outline'>
                  {cancleText}
                </Button>
                {/* </Dialog.ActionTrigger> */}
                <Button p={2} onClick={handleSave}>
                  {saveText}
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  )
}

export default Modal
