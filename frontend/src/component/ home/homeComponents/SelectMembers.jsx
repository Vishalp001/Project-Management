import React, { useEffect, useState } from 'react'
import { HStack, Select, Stack, Tag } from '@chakra-ui/react'

const SelectMembers = ({ projectDetails, onChange }) => {
  const [selectedMembers, setSelectedMembers] = useState([])

  const removeMember = (member) => {
    setSelectedMembers((prev) => prev.filter((m) => m !== member))
  }

  useEffect(() => {
    if (onChange) {
      onChange(selectedMembers)
    }
  }, [selectedMembers])

  return (
    <>
      {projectDetails.members.length > 0 && (
        <Stack align={'flex-end'}>
          <HStack flexWrap={'wrap'} align={'flex-start'}>
            {selectedMembers.length > 0 &&
              selectedMembers.map((user) => (
                <Tag.Root key={user._id} size={'lg'} p={1} variant='solid'>
                  <Tag.Label>{user.name}</Tag.Label>
                  <Tag.EndElement>
                    <Tag.CloseTrigger onClick={() => removeMember(user)} />
                  </Tag.EndElement>
                </Tag.Root>
              ))}
          </HStack>
          <Select.Root
            onValueChange={(details) => {
              const parsed = details.value
                .filter(Boolean) // remove empty/null values
                .map((val) => {
                  try {
                    return JSON.parse(val) // safely parse
                  } catch {
                    return null
                  }
                })
                .filter(Boolean) // remove nulls
              setSelectedMembers(parsed)
            }}
            multiple
            width='200px'
          >
            <Select.HiddenSelect />
            <Select.Label>Assign Members:</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText p={2} placeholder='Select Members' />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content p={1}>
                {projectDetails.members.map((member) => (
                  <Select.Item
                    px={2}
                    mb={'1px'}
                    py={2}
                    fontSize='sm'
                    _selected={{ bg: 'blue.500', color: 'white' }}
                    item={JSON.stringify({
                      _id: member._id,
                      name: member.name,
                    })}
                    key={member._id}
                  >
                    {member.name}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        </Stack>
      )}
    </>
  )
}

export default SelectMembers
