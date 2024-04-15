import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Callout, Link } from '@radix-ui/themes'

export const WIPCallout = ({ className }: { className?: string }) => (
  <Callout.Root color="amber" variant="surface" {...{ className }}>
    <Callout.Icon>
      <InformationCircleIcon className="size-5" />
    </Callout.Icon>
    <Callout.Text>
      This is app is under active development. If you experience any issues, please report them at{' '}
      <Link href="mailto:support@zipurl.co" underline="always">
        support@zipurl.co
      </Link>
      .
    </Callout.Text>
  </Callout.Root>
)
