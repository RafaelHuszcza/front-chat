import { getServerSessionWithAuth } from "@/services/auth"
import { prisma } from "@/services/database"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSessionWithAuth()
  if (!session || !session.user?.id) {
    return new NextResponse(JSON.stringify({ error: 'Usuário não autorizado' }), {
      status: 401,
    })
  }
  if (!params.id) {
    return new NextResponse(JSON.stringify({ message: 'Usuário não encontrado' }), {
      status: 404,
    })
  }
  const room = await prisma.room.findFirst({
    where: {
      id: params.id,
      ownerId: session.user.id
  }})
  if (!room) {
    return new NextResponse(JSON.stringify({ error: 'Sala não encontrada' }), {
      status: 404,
    })
  }
  const deleted = await prisma.room.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ message: 'Usuário deletado com sucesso' })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSessionWithAuth()
  if (!session || !session.user?.id) {
    return new NextResponse(JSON.stringify({ error: 'Usuário não autorizado' }), {
      status: 401,
    })
  }
  if (!params.id) {
    return new NextResponse(JSON.stringify({ message: 'Usuário não encontrado' }), {
      status: 404,
    })
  }
  const room = await prisma.room.findFirst({
    where: {
      id: params.id,
    },
    include: {
      _count: { select: { members: true } },
    }
  })
  console.log(room)
  if (!room || room.ownerId !== session.user.id) {
    return new NextResponse(JSON.stringify({ error: 'Sala não encontrada' }), {
      status: 404,
    })
  }
  if (!room) {
    return new NextResponse(JSON.stringify({ error: 'Sala não encontrada' }), {
      status: 404,
    })
  }
  const deleted = await prisma.room.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ message: 'Usuário deletado com sucesso' })
}

  
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSessionWithAuth()
  if (!session || !session.user?.id) {
    return new NextResponse(JSON.stringify({ error: 'Usuário não autorizado' }), {
      status: 401,
    })
  }
  if (!params.id) {
    return new NextResponse(JSON.stringify({ message: 'Usuário não encontrado' }), {
      status: 404,
    })
  }
  if (session.user.id !== params.id) {
    return new NextResponse(JSON.stringify({ error: 'Usuário não autorizado' }), {
      status: 401,
    })
  }

  const user = await prisma.user.findFirst({
    where: { id: session.user.id },
    select: {
      email: true,
      name: true,
    },
  })
  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'Usuário não encontrado' }), {
      status: 401,
    })
  }
  return NextResponse.json(user)
}
