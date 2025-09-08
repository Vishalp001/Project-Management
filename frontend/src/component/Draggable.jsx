import { useDraggable } from '@dnd-kit/core'
import './dragDrop.scss'

export function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({ id })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 9999 : 'auto',
    position: isDragging ? 'relative' : 'static',
  }

  if (typeof children === 'function') {
    return children({
      setNodeRef,
      attributes,
      listeners,
      style,
    })
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='dragableBox'
    >
      {children}
    </div>
  )
}
