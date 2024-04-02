import clsx from 'clsx'
import Link from 'next/link'

import {
  ArrowTopRightOnSquareIcon,
  ClipboardDocumentIcon,
  EllipsisVerticalIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline'
import { Link as PrismaLink } from '@prisma/client'
import { DropdownMenu } from '@radix-ui/themes'

export interface IProps {
  link: PrismaLink
  className: string
}

export default function RecentLink({ link, className }: IProps) {
  const hostname = process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'zipurl.co'
  const shortLink = `${hostname}/${link.alias}`

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortLink)
  }

  return (
    <div className={clsx('mt-6 flow-root max-w-2/5', className)}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 py-2 md:pt-0">
          <div key={link.alias} className="flex justify-between py-2 border-b border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link href={`/${link.alias}`} target="_blank" className="text-blue-800 font-bold">
                <span className="flex flex-row gap-2 truncate max-w-56 md:max-w-64 lg:max-w-80 xl:max-w-96">
                  {shortLink}
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </span>
              </Link>
              <Link
                href={link.target}
                target="_blank"
                className="text-sm text-gray-500 hover:underline truncate max-w-56 md:max-w-64 lg:max-w-80 xl:max-w-96"
              >
                {link.target}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href=""
                className="rounded-md border p-2 hover:bg-gray-100 hidden lg:block"
                onClick={handleCopyToClipboard}
              >
                <ClipboardDocumentIcon className="h-5 w-5" />
              </Link>
              <Link href="" className="rounded-md border p-2 hover:bg-gray-100 hidden lg:block">
                <QrCodeIcon className="h-5 w-5" />
              </Link>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="block lg:hidden">
                  <Link href="" className="rounded-md border p-2 hover:bg-gray-100">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </Link>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item onClick={handleCopyToClipboard}>
                    <ClipboardDocumentIcon className="h-5 w-5" />
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>
                    <QrCodeIcon className="h-5 w-5" />
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
