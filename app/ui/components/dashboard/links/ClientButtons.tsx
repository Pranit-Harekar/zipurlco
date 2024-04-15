'use client'

import { DropdownMenu } from '@radix-ui/themes'

/*
All buttons that are rendered in the client are defined here.
*/
export function CopyLink({ link }: { link: string }) {
  return (
    <DropdownMenu.Item
      shortcut="⌘ C"
      onClick={() => {
        navigator.clipboard.writeText(link)
      }}
    >
      Copy
    </DropdownMenu.Item>
  )
}
