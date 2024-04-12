import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'
import { redirect } from 'next/navigation'

export const GET = async (req: NextRequest) => {
  const slug = req.url.split('/').pop()

  if (!slug || typeof slug !== 'string') {
    return new Response(`<h1>/Invalid link ${slug}</h1>`, {
      status: 400,
      headers: {
        'content-type': 'text/html',
      },
    })
  }

  // Find the first record where the alias matches the slug
  const link = await prisma.link.findFirst({
    where: {
      alias: slug,
    },
  })

  if (!link) {
    redirect('/')
  }

  // update link count
  await prisma.link.update({
    where: {
      id: link.id,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  })

  // Redirect to the target of the first row (the selected link)
  return NextResponse.redirect(link.target, 302)
}
