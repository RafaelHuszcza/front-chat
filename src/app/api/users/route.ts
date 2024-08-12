import { NextResponse } from 'next/server'

import { getServerSessionWithAuth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function GET() {
  const session = await getServerSessionWithAuth()
  if (!session || !session.user?.id) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não autorizado' }),
      {
        status: 401,
      },
    )
  }

  const users = await prisma.message.findMany({
    include: {
      author: true,
    },
  })
  if (!users) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuários não encontrado' }),
      {
        status: 401,
      },
    )
  }
  return NextResponse.json(users)
}
