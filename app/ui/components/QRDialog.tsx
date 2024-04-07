import Image from 'next/image'
import QRCode, { QRCodeDataURLType } from 'qrcode'
import { useEffect, useState } from 'react'

import { LinkIcon } from '@heroicons/react/24/outline'
import { Link as LinkModel } from '@prisma/client'
import { Button, Dialog, DropdownMenu, Link, Spinner } from '@radix-ui/themes'
import { fqdn } from '@/app/lib/fqdn'

// Helper functions
async function generateQR(shortUrl: string, type: QRCodeDataURLType = 'image/png') {
  try {
    return await QRCode.toDataURL(shortUrl, {
      type,
    })
  } catch (err) {
    console.error(err)
  }
}

async function downloadQR(shortUrl: string, filename: string, type: QRCodeDataURLType) {
  const url = await generateQR(shortUrl, type)
  const a = document.createElement('a')
  if (!url) {
    console.error('Failed to generate QR Code')
    return
  }
  a.href = url
  a.download = `${filename}.${type.split('/')[1]}`
  a.click()
}

export interface IProps {
  link: LinkModel
  open: boolean
  setOpen: (open: boolean) => void
  onClose: () => void
}

export const QRDialog = ({ link, open, onClose, setOpen }: IProps) => {
  const [qrCode, setQRCode] = useState<string>()

  const shortUrl = fqdn(link)
  const imageTypes = ['png', 'jpeg', 'webp']

  useEffect(() => {
    generateQR(`https://${shortUrl}`).then((data) => {
      setQRCode(data)
    })
  }, [shortUrl])

  return (
    <Dialog.Root {...{ open }} onOpenChange={setOpen}>
      <Dialog.Content maxWidth="350px" className="flex flex-col items-center gap-4">
        <Dialog.Title>Download QR Code</Dialog.Title>

        {qrCode ? (
          <>
            <div className="flex flex-col items-center gap-2">
              <Image src={qrCode} alt="QR Code" width={150} height={150} />
              <div className="flex flex-row gap-2 items-center text-gray-500">
                <LinkIcon className="w-4 h-4" />
                <Link href={`/${link.alias}`} target="_blank" size="3">
                  {shortUrl}
                </Link>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-4">
              <Dialog.Close onClick={onClose}>
                <Button variant="soft" color="gray">
                  Close
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button>Download</Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    {imageTypes.map((type) => (
                      <DropdownMenu.Item
                        key={type}
                        onClick={() => {
                          downloadQR(shortUrl, link.alias, `image/${type}` as QRCodeDataURLType)
                        }}
                      >
                        {type.toUpperCase()}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Dialog.Close>
            </div>
          </>
        ) : (
          <Spinner size="3" />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}
