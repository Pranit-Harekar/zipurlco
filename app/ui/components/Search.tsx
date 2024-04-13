'use client'

import { KeyIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { TextField, IconButton } from '@radix-ui/themes'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <TextField.Root
        {...{ placeholder }}
        id="password"
        name="password"
        type="password"
        aria-describedby="password-error"
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        size="2"
        defaultValue={searchParams.get('query')?.toString()}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </div>
  )
}
