'use client'

import { forwardRef } from 'react'

import { Dialog, DropdownMenu } from '@radix-ui/themes'

type DialogItemProps = {
  triggerChildren: React.ReactNode | string
  children: React.ReactNode
  onSelect?: () => void
  onOpenChange?: (open: boolean) => void
  maxWidth?: string
  color?: any
  shortcut?: string
}

const DialogItem = forwardRef<HTMLDivElement, DialogItemProps>((props, forwardedRef) => {
  const {
    triggerChildren,
    children,
    onSelect,
    onOpenChange,
    maxWidth,
    color,
    shortcut,
    ...itemProps
  } = props
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <DropdownMenu.Item
          {...itemProps}
          {...{ color }}
          {...{ shortcut }}
          ref={forwardedRef}
          className="DropdownMenuItem"
          onSelect={(event) => {
            event.preventDefault()
            onSelect && onSelect()
          }}
        >
          {triggerChildren}
        </DropdownMenu.Item>
      </Dialog.Trigger>
      <Dialog.Content className="DialogContent" {...{ maxWidth }}>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  )
})

DialogItem.displayName = 'DialogItem'

export { DialogItem }
