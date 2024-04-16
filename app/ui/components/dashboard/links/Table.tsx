import { getFilteredLinks } from '@/app/lib/actions'
import { fqdn } from '@/app/lib/fqdn'
import { formatDateToLocal } from '@/app/lib/utils'
import { DeleteLink, UpdateLink } from '@/app/ui/components/dashboard/links/Buttons'
import LinkStatus from '@/app/ui/components/dashboard/links/Status'
import { CursorArrowRippleIcon, EllipsisVerticalIcon, LinkIcon } from '@heroicons/react/24/outline'
import { Avatar, DropdownMenu, Flex, IconButton, Link, Text } from '@radix-ui/themes'

import { CopyLink } from './ClientButtons'

export default async function LinksTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const links = await getFilteredLinks(query, currentPage)

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {links?.map((link) => (
              <div key={link.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4 gap-2">
                  <div className="mb-2 flex items-center gap-2">
                    <Avatar
                      src={link.thumbnail ?? undefined}
                      fallback={<LinkIcon className="w-6 h-6" />}
                      size="4"
                      alt={`${link.alias} thumbnail`}
                    />
                    <div className="flex flex-col gap-2 truncate max-w-44 md:max-w-56 lg:max-w-72 xl:max-w-80">
                      <Text size="3" weight="medium">
                        <Link href={`/${link.alias}`} target="_blank">
                          {fqdn(link)}
                        </Link>
                      </Text>
                      <Text size="2">
                        <Link href={link.target} target="_blank" color="gray">
                          {link.target}
                        </Link>
                      </Text>
                    </div>
                  </div>
                  <LinkStatus status={link.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex flex-col gap-2">
                    <Text size="3" weight="bold" className="flex justify-start items-center gap-1">
                      <CursorArrowRippleIcon className="size-4" />
                      {link.clicks}
                    </Text>
                    <Text size="2" color="gray">
                      {formatDateToLocal(link.createdAt.toString())}
                    </Text>
                  </div>
                  <DropdownMenu.Root modal>
                    <DropdownMenu.Trigger>
                      <IconButton variant="surface" color="gray">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <CopyLink link={fqdn(link)} />
                      <UpdateLink id={link.id} />
                      <DropdownMenu.Separator />
                      <DeleteLink id={link.id} />
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Link
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Target
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Clicks
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created At
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {links?.map((link) => (
                <tr
                  key={link.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={link.thumbnail ?? undefined}
                        fallback={<LinkIcon className="w-6 h-6" />}
                        size="4"
                        alt={`${link.alias} thumbnail`}
                      />
                      <Text weight="medium">
                        <Link href={`/${link.alias}`} target="_blank">
                          {fqdn(link)}
                        </Link>
                      </Text>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 truncate max-w-44 md:max-w-56 lg:max-w-72 xl:max-w-80">
                    <Text size="2">
                      <Link href={link.target} target="_blank" color="gray">
                        {link.target}
                      </Link>
                    </Text>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{link.clicks}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(link.createdAt.toString())}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <LinkStatus status={link.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-2 pr-3">
                    <DropdownMenu.Root modal>
                      <DropdownMenu.Trigger>
                        <IconButton variant="surface" color="gray">
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </IconButton>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content>
                        <CopyLink link={fqdn(link)} />
                        <UpdateLink id={link.id} />
                        <DropdownMenu.Separator />
                        <DeleteLink id={link.id} />
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
