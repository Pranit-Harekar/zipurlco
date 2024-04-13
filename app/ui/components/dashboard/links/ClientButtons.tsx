'use client'

import { DropdownMenu } from '@radix-ui/themes'

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
