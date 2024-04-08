import clsx from 'clsx'

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function LinkStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx('inline-flex items-center rounded-full px-2 py-1 text-xs', {
        'bg-gray-100 text-gray-500': status === 'inactive',
        'bg-green-500 text-white': status === 'active',
      })}
    >
      {status === 'inactive' ? (
        <>
          Inactive
          <XMarkIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'active' ? (
        <>
          Active
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  )
}
