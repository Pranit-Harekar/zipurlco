'use server'

import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { AuthError } from 'next-auth'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'
import ogs from 'open-graph-scraper'
import { z } from 'zod'

import prisma from '@/app/lib/prisma'
import { auth, signIn } from '@/auth'
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

export async function createTrialLink(prevState: State, formData: FormData) {
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

const getCurrentUser = async () => {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    throw new Error('User not authenticated')
  }

  return session.user
}

const ITEMS_PER_PAGE = 6
export async function getFilteredLinks(query: string, currentPage: number) {
  noStore()

  const userId = (await getCurrentUser()).id
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    return await prisma.link.findMany({
      where: {
        userId,
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

  const userId = (await getCurrentUser()).id

  const totalLinks = await prisma.link.count({
    where: {
      userId,
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

export type LinkState = {
  errors?: {
    target?: string[]
    status?: string[]
  }
  message?: string | null
}

const LinkFormSchema = z.object({
  target: z
    .string({
      required_error: 'Please enter a URL.',
      invalid_type_error: 'Please enter a valid URL.',
    })
    .min(1, 'Please enter a URL.'),
  status: z.enum(['active', 'inactive', 'pending'], {
    required_error: 'Please select a status.',
  }),
})

export async function createLink(prevState: LinkState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = LinkFormSchema.safeParse({
    target: formData.get('target'),
    status: formData.get('status'),
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Link.',
    }
  }

  const { target, status } = validatedFields.data
  const ogData = await getOGData(target)
  const userId = (await getCurrentUser()).id

  try {
    await prisma.link.create({
      data: {
        target,
        status,
        alias: nanoid(10),
        thumbnail: ogData && ogData.image,
        userId,
      },
    })
  } catch (error) {
    return {
      message: 'Failed to create link.',
    }
  }

  revalidatePath('/dashboard/links')
  redirect('/dashboard/links')
}

const UpdateLinkFormSchema = z.object({
  target: z
    .string({
      required_error: 'Please enter a URL.',
      invalid_type_error: 'Please enter a valid URL.',
    })
    .min(1, 'Please enter a URL.'),
  status: z.enum(['active', 'inactive', 'pending'], {
    required_error: 'Please select a status.',
  }),
  resetCount: z.string().nullish(),
})

export async function updateLink(id: string, prevState: LinkState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateLinkFormSchema.safeParse({
    target: formData.get('target'),
    status: formData.get('status'),
    resetCount: formData.get('resetCount'),
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update Link.',
    }
  }

  const { target, status, resetCount } = validatedFields.data
  const ogData = await getOGData(target)
  const userId = (await getCurrentUser()).id

  try {
    await prisma.link.update({
      where: { id, userId },
      data: {
        target,
        status,
        thumbnail: ogData && ogData.image,
        clicks: resetCount ? 0 : undefined,
      },
    })
  } catch (error) {
    return {
      message: 'Failed to update link.',
    }
  }

  revalidatePath('/dashboard/links')
  redirect('/dashboard/links')
}

export async function deleteLink(id: string) {
  const userId = (await getCurrentUser()).id

  try {
    await prisma.link.delete({
      where: { id, userId },
    })
    revalidatePath('/dashboard/links')
    redirect('/dashboard/links')
  } catch (error) {
    return {
      message: 'Failed to delete link.',
    }
  }
}

export async function getLinkById(id: string) {
  const userId = (await getCurrentUser()).id

  try {
    return await prisma.link.findFirst({
      where: {
        id,
        userId,
      },
    })
  } catch (error) {
    console.error('Failed to fetch link:', error)
    return null
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
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

export async function getUserById(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export type LoginState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string | null
    }
  | undefined

export async function authenticate(prevState: LoginState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UserFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to login.',
    }
  }

  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'Invalid credentials.',
          }
        default:
          return {
            message: 'Something went wrong.',
          }
      }
    }
    throw error
  }
}

const UserFormSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(8, { message: 'Please enter a password.' }),
})

const RegisterFormSchema = z
  .object({
    email: z.string().email('Please enter a valid email.'),
    password: z.string().min(8, { message: 'Please enter a password.' }),
    confirmPassword: z.string().min(8, { message: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export type RegisterState = {
  errors?: {
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
  }
  message?: string | null
}

export async function register(prevState: RegisterState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to Register.',
    }
  }

  const { email, password } = validatedFields.data

  try {
    // Check if user already exists
    if (await getUserByEmail(email)) {
      return {
        message: 'User already exists. Please login',
      }
    }

    // Create user
    await prisma.user.create({
      data: {
        email: email.toString(),
        password: await bcrypt.hash(password.toString(), 10),
      },
    })
  } catch (error) {
    return {
      message: 'Failed to register.',
    }
  }

  // Redirect to login page
  revalidatePath('/login')
  redirect('/login')
}

const UpdateUserFormSchema = z
  .object({
    email: z.string().email('Please enter a valid email.'),
    password: z.string().min(8, { message: 'Please enter a password.' }),
    confirmPassword: z.string().min(8, { message: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export type UpdateUserState = {
  errors?: {
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
  }
  message?: string | null
}

export async function updateUser(id: string, prevState: UpdateUserState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateUserFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update User.',
    }
  }

  const { email, password } = validatedFields.data

  try {
    await prisma.user.update({
      where: { id },
      data: {
        email: email.toString(),
        password: await bcrypt.hash(password.toString(), 10),
      },
    })
  } catch (error) {
    return {
      message: 'Failed to update user.',
    }
  }

  revalidatePath('/dashboard/settings')
  return {
    message: 'User updated successfully.',
  }
}
