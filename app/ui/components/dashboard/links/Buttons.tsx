import Link from 'next/link'

import { deleteLink } from '@/app/lib/actions'
import { DialogItem } from '@/app/ui/components/DialogItem'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Button, Dialog, DropdownMenu, Flex } from '@radix-ui/themes'

export function CreateLink() {
  return (
    <Link
      href="/dashboard/links/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Link</span> <PlusIcon className="h-5 md:ml-4" />
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
        Are you sure you want to delete this link? This action cannot be undone.
      </Dialog.Description>
      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft">Close</Button>
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
