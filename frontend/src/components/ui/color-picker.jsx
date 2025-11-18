import {
  Code,
  ColorPicker,
  HStack,
  Portal,
  Stack,
  parseColor,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export const Colorpicker = ({ onColorChange, colorCode, isEdit }) => {
  const defaultColor = colorCode || '#eb5e41'
  const [value, setValue] = useState(defaultColor)

  useEffect(() => {
    if (isEdit && colorCode) {
      setValue(colorCode)
    }
  }, [isEdit, colorCode])

  const sendData = (e) => {
    const hex = e.value.toString('hex')
    setValue(hex)
    if (onColorChange) onColorChange(hex)
  }

  return (
    <Stack gap='8' align='flex-start'>
      <ColorPicker.Root value={parseColor(value)} onValueChange={sendData}>
        <ColorPicker.HiddenInput />
        <ColorPicker.Label>Color</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.Input />
          <ColorPicker.Trigger />
        </ColorPicker.Control>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
            <HStack>
              <ColorPicker.EyeDropper size='xs' variant='outline' />
              <ColorPicker.Sliders />
            </HStack>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </ColorPicker.Root>
    </Stack>
  )
}
