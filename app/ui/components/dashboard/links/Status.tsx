import { CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Status } from '@prisma/client'
import { Badge, Radio, Text } from '@radix-ui/themes'

export default function LinkStatus({ status }: { status: Status }) {
  switch (status) {
    case 'active': {
      return <Badge color="green">Active</Badge>
    }
    case 'inactive': {
      return <Badge color="gray">Inactive</Badge>
    }
    case 'pending': {
      return <Badge color="orange">Pending</Badge>
    }
  }
}

export const LinkStatusInput = ({ defaultValue }: { defaultValue?: Status }) => {
  const defaultStatus = defaultValue || Status.active
  const data = {
    [Status.active]: { label: 'Active', color: 'green', icon: <CheckIcon className="size-4" /> },
    [Status.pending]: { label: 'Pending', color: 'orange', icon: <ClockIcon className="size-4" /> },
    [Status.inactive]: { label: 'Inactive', color: 'gray', icon: <XMarkIcon className="size-4" /> },
  }

  return (
    <fieldset>
      <label htmlFor="status" className="mb-3 block text-sm font-medium">
        Set the link status
      </label>
      <div className="flex flex-col sm:flex-row gap-4" aria-describedby="status-error">
        {Object.entries(data).map(([key, value]) => (
          <div className="flex items-center gap-2" key={key}>
            <Text as="label" size="2" className="flex gap-1 cursor-pointer">
              <Radio id={key} name="status" value={key} defaultChecked={key === defaultStatus} />
              <Badge color={value.color as any}>
                {value.label} {value.icon}
              </Badge>
            </Text>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
