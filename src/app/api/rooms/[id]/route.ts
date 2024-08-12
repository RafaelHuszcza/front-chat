import { NextRequest, NextResponse } from 'next/server'

import { getServerSessionWithAuth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSessionWithAuth()
  if (!session || !session.user?.id) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não autorizado' }),
      {
        status: 401,
      },
    )
  }
  if (!params.id) {
    return new NextResponse(
      JSON.stringify({ message: 'Sala não encontrado' }),
      {
        status: 404,
      },
    )
  }
  const room = await prisma.room.findFirst({
    where: {
      id: params.id,
      ownerId: session.user.id,
    },
  })
  if (!room) {
    return new NextResponse(JSON.stringify({ error: 'Sala não encontrada' }), {
      status: 404,
    })
  }
  await prisma.room.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ message: 'Sala deletado com sucesso' })
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSessionWithAuth()
  if (!session || !session.user?.id) {
    console.log('Usuário não autorizado')
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não autorizado' }),
      {
        status: 401,
      },
    )
  }
  if (!params.id) {
    return new NextResponse(
      JSON.stringify({ message: 'Sala não encontrada' }),
      {
        status: 404,
      },
    )
  }

  const room = await prisma.room.findFirst({
    where: { id: params.id },
    select: {
      id: true,
      subject: true,
    },
  })
  if (!room) {
    return new NextResponse(
      JSON.stringify({ error: 'Sala Não não encontrado' }),
      {
        status: 404,
      },
    )
  }
  return NextResponse.json(room)
}
