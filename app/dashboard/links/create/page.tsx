import Breadcrumbs from '@/app/ui/components/dashboard/links/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Invoices',
}

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Links', href: '/dashboard/links/create' },
          {
            label: 'Create Link',
            href: '/dashboard/links/create',
            active: true,
          },
        ]}
      />
    </main>
  )
}
