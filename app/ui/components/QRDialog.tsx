import Image from 'next/image'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'

import { LinkIcon } from '@heroicons/react/24/outline'
import { Button, Dialog, DropdownMenu, Link, Spinner } from '@radix-ui/themes'

const generateQR = async (
  shortUrl: string,
  type: 'image/png' | 'image/jpeg' | 'image/webp' = 'image/png',
) => {
  try {
    return await QRCode.toDataURL(shortUrl, {
      type,
    })
  } catch (err) {
    console.error(err)
  }
}

const downloadQR = async (
  shortUrl: string,
  filename: string,
  type: 'image/png' | 'image/jpeg' | 'image/webp',
) => {
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

export const QRDialog = ({
  shortUrl,
  alias,
  open,
  onClose,
  setOpen,
}: {
  shortUrl: string
  alias: string
  open: boolean
  setOpen: (open: boolean) => void
  onClose: () => void
}) => {
  const [qrCode, setQRCode] = useState<string>()

  useEffect(() => {
    console.log('Generating QR Code...')
    const httpsUrl = `https://${shortUrl}`
    generateQR(httpsUrl).then((data) => {
      setQRCode(data)
      console.log('QR Code generated!', data)
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
                <Link href={`/${alias}`} target="_blank" size="3">
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
                    <DropdownMenu.Item
                      onClick={() => {
                        downloadQR(shortUrl, alias, 'image/png')
                      }}
                    >
                      PNG
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => {
                        downloadQR(shortUrl, alias, 'image/jpeg')
                      }}
                    >
                      JPEG
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => {
                        downloadQR(shortUrl, alias, 'image/webp')
                      }}
                    >
                      WEBP
                    </DropdownMenu.Item>
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
