import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/services/database'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const existingUser = await prisma.user.findFirst({
      where: { email: body.email },
    })
    if (existingUser) {
      return NextResponse.json(
        { message: 'Usuário já registrado' },
        { status: 400 },
      )
    }
    const userSchema = z.object({
      name: z
        .string({ required_error: 'Nome é requerido' })
        .min(3, 'O Nome deve conter mais de 3 caracteres'),
      email: z
        .string({ required_error: 'Email é requerido' })
        .email('Email Inválido'),
      password: z
        .string()
        .min(6, { message: 'A senha precisa de no mínimo 6 caracteres' })
        .regex(/^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,20}$/, {
          message: 'É necessário 1 caractere especial e 1 número',
        }),
    })
    type FormData = z.infer<typeof userSchema>

    const userValidate: FormData = userSchema.parse(body)

    if (!userValidate) {
      return new NextResponse(JSON.stringify({ error: 'Dados inválidos' }), {
        status: 400,
      })
    }
    const hashPassword = await hash(userValidate.password, 12)
    await prisma.user.create({
      data: {
        email: userValidate.email,
        name: userValidate.name,
        password: hashPassword,
      },
    })
    return NextResponse.json({ message: 'Usuário Cadastrado' })
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
