'use client'

import { ColorPicker, HStack, parseColor } from '@chakra-ui/react'
import { useState } from 'react'

export const Colorpicker = () => {
  const [color, setColor] = useState(parseColor('#eb5e41'))
  console.log(color, 'color') // ✅ You get the selected value here
  return (
    <ColorPicker.Root
      defaultValue={parseColor('#eb5e41')}
      value={color}
      onChange={(newColor) => {
        console.log('Selected color:', newColor) // ✅ You get the selected value here
        setColor(newColor)
      }}
      maxW='200px'
    >
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
  )
}
