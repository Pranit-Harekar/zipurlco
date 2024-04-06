'use server'

import { nanoid } from 'nanoid'
import ogs from 'open-graph-scraper'

import prisma from '@/lib/prisma'
import { Link as PrismaLink } from '@prisma/client'

export type State = {
  link?: PrismaLink | null
  error?: string | null
}

async function getOGData(url: string) {
  try {
    const options = {
      url,
    }
    const data = await ogs(options)
    const { ogTitle, ogDescription, ogImage, ogSiteName, ogType, ogUrl } = data.result
    return {
      title: ogTitle,
      description: ogDescription,
      image: ogImage && ogImage[0].url,
      siteName: ogSiteName,
      type: ogType,
      url: ogUrl,
    }
  } catch (error) {
    console.error(error)
  }
}

export async function shortenUrl(prevState: State, formData: FormData) {
  const url = formData.get('long_url') as string // todo: fix this
  const ogData = await getOGData(url)

  const link = await prisma.link.create({
    data: {
      target: url,
      alias: nanoid(10),
      thumbnail: ogData && ogData.image,
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
