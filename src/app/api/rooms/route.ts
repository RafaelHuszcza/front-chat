import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getServerSessionWithAuth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function GET() {
  try {
    const session = await getServerSessionWithAuth()
    if (!session) {
      return new NextResponse(JSON.stringify({ message: 'unauthorized' }), {
        status: 401,
      })
    }
    const rooms = await prisma.room.findMany()
    return NextResponse.json(rooms)
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()

  const session = await getServerSessionWithAuth()
  if (!session || !session.user?.id) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }
  const user = await prisma.user.findFirst({
    where: { id: session.user.id },
    include: {
      _count: { select: { ownedRooms: true } },
    },
  })
  if (!user) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não encontrado' }),
      {
        status: 401,
      },
    )
  }
  if (user._count.ownedRooms >= 3) {
    return new NextResponse(
      JSON.stringify({ message: 'O limite de salas por usuário é 3 ' }),
      {
        status: 400,
      },
    )
  }
  const roomSchema = z.object({
    subject: z
      .string({ required_error: 'Nome é requerido' })
      .min(3, 'O Assunto deve conter mais de 3 caracteres'),
  })
  type FormData = z.infer<typeof roomSchema>

  const roomValidate: FormData = roomSchema.parse(body)

  if (!roomValidate) {
    return new NextResponse(JSON.stringify({ error: 'Dados inválidos' }), {
      status: 400,
    })
  }

  const newRoom = await prisma.room.create({
    data: {
      subject: roomValidate.subject,
      ownerId: user.id,
      members: { connect: { id: user.id } },
    },
    select: {
      id: true,
    },
  })

  return NextResponse.json(newRoom)
}
