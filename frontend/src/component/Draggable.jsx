import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import './dragDrop.scss'

export function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div ref={setNodeRef} style={style} className='dragableBox'>
      {/* Drag handle passed via context */}
      {typeof children === 'function'
        ? children({ listeners, attributes }) // let parent decide
        : children}
    </div>
  )
}
