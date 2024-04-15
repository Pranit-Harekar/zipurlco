import Link from 'next/link'

import { deleteLink } from '@/app/lib/actions'
import { DialogItem } from '@/app/ui/components/DialogItem'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Button, Dialog, DropdownMenu, Flex, Text, Tooltip } from '@radix-ui/themes'

export function CreateLink() {
  return (
    <Link href="/dashboard/links/create">
      <Tooltip content="Create a new link">
        <Button size="2">
          <PlusIcon className="size-5" />
          <Text className="text-nowrap hidden sm:block">Create Link</Text>
        </Button>
      </Tooltip>
    </Link>
  )
}

export function UpdateLink({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/links/${id}/edit`}>
      <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
    </Link>
  )
}

export function DeleteLink({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteLink.bind(null, id)

  return (
    <DialogItem triggerChildren="Delete" color="red" shortcut="⌘ ⌫" maxWidth="450px">
      <Dialog.Title>Delete Link</Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Are you sure you want to delete this link? This action is permanent and cannot be undone.
      </Dialog.Description>
      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Close
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <form action={deleteInvoiceWithId}>
            <Button color="red">Yes, Delete Link</Button>
          </form>
        </Dialog.Close>
      </Flex>
    </DialogItem>
  )
}
