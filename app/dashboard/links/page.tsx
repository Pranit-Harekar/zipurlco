import { Metadata } from 'next'
import { Suspense } from 'react'

import { fetchLinksPages } from '@/app/lib/actions'
import { CreateLink } from '@/app/ui/components/dashboard/links/Buttons'
import Pagination from '@/app/ui/components/dashboard/links/Pagination'
import Search from '@/app/ui/components/Search'
import { LinksSkeleton } from '@/app/ui/components/dashboard/links/Skeleton'
import Table from '@/app/ui/components/dashboard/links/Table'
import { lusitana } from '@/app/ui/fonts'

export const metadata: Metadata = {
  title: 'Links',
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchLinksPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Links</h1>
      </div>
      <div className="mt-4 flex items-center gap-2 md:mt-8">
        <Search placeholder="Search links..." />
        <CreateLink />
      </div>
      <Suspense key={query + currentPage} fallback={<LinksSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
