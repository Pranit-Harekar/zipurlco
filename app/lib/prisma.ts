import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

let prisma: PrismaClient

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
const adapter = new PrismaNeon(neon)

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ adapter })
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient({ adapter })
  }
  // @ts-ignore
  prisma = global.prisma
}

export default prisma
