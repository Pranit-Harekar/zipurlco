import { Link } from '@prisma/client'

const hostname = process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'zipurl.co'

export const fqdn = (link: Link) => `${hostname}/${link.alias}`
