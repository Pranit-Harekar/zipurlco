import NextAuth from 'next-auth'
import Resend from 'next-auth/providers/resend'

import { sendVerificationRequest } from '@/app/lib/resend'
import { authConfig } from '@/auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  debug: process.env.NODE_ENV === 'development',
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
})
