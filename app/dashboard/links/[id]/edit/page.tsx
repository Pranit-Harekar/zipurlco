import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getLinkById } from '@/app/lib/actions'
import Breadcrumbs from '@/app/ui/components/dashboard/links/Breadcrumbs'
import Form from '@/app/ui/components/dashboard/links/EditForm'

export const metadata: Metadata = {
  title: 'Edit Links',
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const link = await getLinkById(id)

  if (!link) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Links', href: '/dashboard/links' },
          {
            label: 'Edit Link',
            href: `/dashboard/links/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form {...{ link }} />
    </main>
  )
}
