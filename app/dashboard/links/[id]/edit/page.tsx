import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Breadcrumbs from '@/app/ui/components/dashboard/links/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Edit Invoices',
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id

  if (!id) {
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
    </main>
  )
}
