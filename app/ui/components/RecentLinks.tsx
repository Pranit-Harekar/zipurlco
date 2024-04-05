import clsx from 'clsx'
import { useState } from 'react'

import {
  ArrowRightIcon,
  CheckIcon,
  ClipboardDocumentIcon,
  EllipsisVerticalIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline'
import { Link as PrismaLink } from '@prisma/client'
import { Button, DropdownMenu, Flex, IconButton, Link, Separator } from '@radix-ui/themes'

import { QRDialog } from './QRDialog'

export interface IProps {
  link: PrismaLink
  className?: string
}

export default function RecentLink({ link, className }: IProps) {
  const [copySuccess, setCopySuccess] = useState(false)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)

  const hostname = process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'zipurl.co'
  const shortLink = `${hostname}/${link.alias}`

  const handleCopyToClipboard = () => {
    setCopySuccess(true)
    navigator.clipboard.writeText(shortLink)
    setTimeout(() => {
      setCopySuccess(false)
    }, 2000)
  }

  const renderCopyToClipboard = () =>
    copySuccess ? <CheckIcon className="h-5 w-5" /> : <ClipboardDocumentIcon className="h-5 w-5" />

  return (
    <div className={clsx('mt-6 flow-root max-w-2/5', className)}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg py-2 md:pt-0">
          <div key={link.alias} className="flex justify-between">
            {/* Links */}
            <div className="flex flex-col space-y-2 truncate max-w-56 md:max-w-64 lg:max-w-80 xl:max-w-96">
              <Link href={`/${link.alias}`} target="_blank" size="4">
                {shortLink}
              </Link>
              <Link href={link.target} target="_blank" size="2" color="gray" underline="always">
                {link.target}
              </Link>
            </div>

            {/* Options */}
            <div className="items-center gap-3 hidden lg:flex">
              <IconButton onClick={handleCopyToClipboard} variant="soft">
                {renderCopyToClipboard()}
              </IconButton>
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
            <div className="block lg:hidden">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton variant="soft">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item>
                    <IconButton onClick={handleCopyToClipboard} variant="soft">
                      {renderCopyToClipboard()}
                    </IconButton>
                  </DropdownMenu.Item>
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
              shortUrl={shortLink}
              alias={link.alias}
              open={qrDialogOpen}
              onClose={() => setQrDialogOpen(false)}
              setOpen={setQrDialogOpen}
            />
          </div>
        </div>
      </div>

      <Flex className="flex-col mt-10 justify-center">
        <Button size="3" variant="outline">
          Sign Up for more <ArrowRightIcon className="h-5 w-5" />
        </Button>
      </Flex>
    </div>
  )
}
