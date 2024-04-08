'use server'

import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { AuthError } from 'next-auth'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'
import ogs from 'open-graph-scraper'

import { signIn } from '@/auth'
import prisma from '@/lib/prisma'
import { Link as PrismaLink, User } from '@prisma/client'

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

const ITEMS_PER_PAGE = 6
export async function getFilteredLinks(query: string, currentPage: number) {
  noStore()

  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    return await prisma.link.findMany({
      where: {
        OR: [
          {
            target: {
              contains: query,
            },
          },
          {
            alias: {
              contains: query,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    })
  } catch (error) {
    console.error('Failed to fetch links', error)
    return []
  }
}

export async function fetchLinksPages(query: string) {
  noStore()

  const totalLinks = await prisma.link.count({
    where: {
      OR: [
        {
          target: {
            contains: query,
          },
        },
        {
          alias: {
            contains: query,
          },
        },
      ],
    },
  })

  return Math.ceil(totalLinks / ITEMS_PER_PAGE)
}

export async function updateLink(id: string, formData: FormData) {
  const { target } = Object.fromEntries(formData)
  try {
    await prisma.link.update({
      where: { id },
      data: {
        target: target.toString(),
      },
    })
    revalidatePath('/dashboard/links')
  } catch (error) {
    return {
      message: 'Failed to update link.',
    }
  }
}

export async function deleteLink(id: string) {
  try {
    await prisma.link.delete({
      where: { id },
    })
    revalidatePath('/dashboard/links')
  } catch (error) {
    return {
      message: 'Failed to delete link.',
    }
  }
}

export async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export async function register(prevState: string | undefined, formData: FormData) {
  try {
    const { email, password } = Object.fromEntries(formData)
    await prisma.user.create({
      data: {
        email: email.toString(),
        password: await bcrypt.hash(password.toString(), 10),
      },
    })

    revalidatePath('/login')
    redirect('/login')
  } catch (error) {
    return 'Failed to register user.'
  }
}
