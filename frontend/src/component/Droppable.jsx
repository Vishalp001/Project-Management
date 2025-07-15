import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import './dragDrop.scss'
export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  return (
    <div className='dropableBox' ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}
