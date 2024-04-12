import { Metadata } from 'next'

import Breadcrumbs from '@/app/ui/components/dashboard/links/Breadcrumbs'
import Form from '@/app/ui/components/dashboard/links/CreateForm'

export const metadata: Metadata = {
  title: 'Create Invoices',
}

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Links', href: '/dashboard/links' },
          {
            label: 'Create Link',
            href: '/dashboard/links/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  )
}
