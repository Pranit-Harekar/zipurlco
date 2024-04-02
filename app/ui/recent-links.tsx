import {
  ClipboardDocumentIcon,
  QrCodeIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'
import { Link as PrismaLink } from '@prisma/client'
import Link from 'next/link'
import clsx from 'clsx'

export interface IProps {
  link: PrismaLink
  className: string
}

export default function RecentLink({ link, className }: IProps) {
  const hostname = window.location.hostname
  const shortLink = `${hostname}/${link.alias}`
  return (
    <div className={clsx('mt-6 flow-root', className)}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 py-2 md:pt-0">
          <div key={link.alias} className="flex justify-between py-2 border-b border-gray-200">
            <div className="flex flex-col space-y-2 truncate max-w-40 md:max-w-48 lg:max-w-52 xl:max-w-80 ">
              <Link href={`/${link.alias}`} target="_blank" className="text-blue-800 font-semibold">
                <span className="flex flex-row gap-2">
                  {shortLink}
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </span>
              </Link>
              <Link
                href={link.target}
                className="text-sm text-gray-500 line-clamp-1 hover:underline overflow-hidden text-overflow-ellipsis whitespace-nowrap"
              >
                {link.target}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href=""
                className="rounded-md border p-2 hover:bg-gray-100"
                onClick={() => {
                  navigator.clipboard.writeText(shortLink)
                }}
              >
                <ClipboardDocumentIcon className="h-5 w-5" />
              </Link>
              <Link href="" className="rounded-md border p-2 hover:bg-gray-100">
                <QrCodeIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
