import {
  Code,
  ColorPicker,
  HStack,
  Portal,
  Stack,
  parseColor,
} from '@chakra-ui/react'
import { useState } from 'react'

export const Colorpicker = ({ colorCode }) => {
  const [value, setValue] = useState(parseColor('#eb5e41'))

  const sendData = (e) => {
    setValue(e.value)
    colorCode(e.value.toString('hex'))
  }

  return (
    <Stack gap='8' align='flex-start'>
      <ColorPicker.Root defaultValue={value} onValueChange={sendData}>
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
