'use server'

import { nanoid } from 'nanoid'

import prisma from '@/lib/prisma'
import { Link as PrismaLink } from '@prisma/client'

export type State = {
  link?: PrismaLink | null
  error?: string | null
}

export async function shortenUrl(prevState: State, formData: FormData) {
  const link = await prisma.link.create({
    data: {
      target: formData.get('long_url') as string, // todo: fix this
      alias: nanoid(10),
    },
  })

  return { link }
}

export async function getRecentLinks() {
  return await prisma.link.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
  })
}
