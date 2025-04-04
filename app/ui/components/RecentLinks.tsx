import clsx from 'clsx'
import { useState } from 'react'

import { fqdn } from '@/app/lib/fqdn'
import {
  CheckIcon,
  ClipboardDocumentIcon,
  EllipsisVerticalIcon,
  LinkIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline'
import { Link as LinkModel } from '@prisma/client'
import { Avatar, DropdownMenu, IconButton, Link, Separator, Skeleton } from '@radix-ui/themes'

import { QRDialog } from './QRDialog'

export interface IProps {
  link: LinkModel
  className?: string
}

export default function RecentLink({ link, className }: IProps) {
  const [copySuccess, setCopySuccess] = useState(false)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const shortLink = fqdn(link)

  const handleCopyToClipboard = () => {
    setCopySuccess(true)
    navigator.clipboard.writeText(shortLink)
    setTimeout(() => {
      setCopySuccess(false)
    }, 2000)
  }

  const renderCopyToClipboard = () => (
    <IconButton
      onClick={handleCopyToClipboard}
      variant="soft"
      color={copySuccess ? 'grass' : 'blue'}
    >
      {copySuccess ? (
        <CheckIcon className="h-5 w-5" />
      ) : (
        <ClipboardDocumentIcon className="h-5 w-5" />
      )}
    </IconButton>
  )

  return (
    <div className={clsx('mt-4 flow-root max-w-2/5', className)}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg py-2 md:pt-0">
          <div key={link.alias} className="flex justify-between">
            {/* Links */}
            <div className="flex items-center gap-2">
              {link.thumbnail ? (
                <Avatar
                  size="4"
                  src={link.thumbnail ?? '#'}
                  fallback={<LinkIcon className="h-5 w-5" />}
                  className="border border-gray-200"
                />
              ) : (
                <Avatar size="4" fallback={<LinkIcon className="h-5 w-5" />} />
              )}
              <div className="flex flex-col space-y-2 truncate max-w-44 md:max-w-56 lg:max-w-72 xl:max-w-80">
                <Link href={`/${link.alias}`} target="_blank" size="4">
                  {shortLink}
                </Link>
                <Link
                  href={link.target}
                  target="_blank"
                  size="2"
                  color="gray"
                  underline="always"
                  truncate
                >
                  {link.target}
                </Link>
              </div>
            </div>

            {/* Options */}
            <div className="items-center gap-3 hidden lg:flex">
              {renderCopyToClipboard()}
              <Separator orientation="vertical" size="2" />
              <IconButton
                onClick={() => {
                  setQrDialogOpen(true)
                }}
                variant="soft"
              >
                <QrCodeIcon className="h-5 w-5" />
              </IconButton>
            </div>

            {/* Options - small form factor */}
            <div className="flex items-center lg:hidden">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton variant="soft">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item>{renderCopyToClipboard()}</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>
                    <IconButton
                      onClick={() => {
                        setQrDialogOpen(true)
                      }}
                      variant="soft"
                    >
                      <QrCodeIcon className="h-5 w-5" />
                    </IconButton>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>

            {/* Closed QR dialog */}
            <QRDialog
              {...{ link }}
              open={qrDialogOpen}
              onClose={() => setQrDialogOpen(false)}
              setOpen={setQrDialogOpen}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const RecentLinksSkeleton = () => (
  <div className="mt-4 flow-root max-w-2/5 animate-pulse">
    <div className="inline-block min-w-full align-middle">
      <div className="py-2 md:pt-0">
        <div className="flex gap-2 flex-none">
          <Skeleton className="w-12 h-12" />

          {/* <!-- Links --> */}
          <div className="flex flex-col space-y-2 grow">
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
          </div>

          {/* <!-- Options --> */}
          <div className="items-center gap hidden lg:flex flex-none">
            <Skeleton className="w-7 h-7" />
            <Skeleton className="w-0.5 h-7 mx-2" />
            <Skeleton className="w-7 h-7" />
          </div>

          {/* <!-- Options - small form factor--> */}
          <div className="items-center flex lg:hidden flex-none">
            <Skeleton className="w-7 h-7" />
          </div>
        </div>
      </div>
    </div>
  </div>
)
