'use server'

import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
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

export async function getRecentLinks() {
  return await prisma.link.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
  })
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
