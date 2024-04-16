import type { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import prisma from './app/lib/prisma'

export const authConfig = {
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
    error: '/auth/error',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to signin page
      } else if (isLoggedIn) {
        const redirectableUrlsIfLoggedIn = ['/auth/signin', '/auth/verify', '/auth/signup', '/']
        if (redirectableUrlsIfLoggedIn.includes(nextUrl.pathname)) {
          return Response.redirect(new URL('/dashboard', nextUrl))
        }
      }
      return true
    },
    session: async ({ session, token }) => {
      if (token && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
