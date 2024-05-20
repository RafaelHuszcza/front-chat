'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { ErrorMessage } from '@/components/error-message'
import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ZCOOL_KuaiLe } from 'next/font/google'

export interface DefaultValues {
  name: string
  email: string
}
interface UserFormProps {
  defaultValues: DefaultValues
  id : string
}
export function UserForm({defaultValues, id}: UserFormProps) {
  const router = useRouter()
  const formSchema = z.object({
    name: z.string({ required_error: 'Nome é requerido' }).min(3, 'O Nome deve conter mais de 3 caracteres'),
    email: z
      .string({ required_error: 'Email é requerido' })
      .email('Email Inválido'),
    password: z
      .string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  }).refine((data) => {
    if (data?.password === "") {
      return true; 
    }
    if (!data?.password) {
      return true;
    }
      return data?.password?.length >= 6 && /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,20}$/.test(data?.password);
    
  }, {
    message: 'A senha precisa ter no mínimo 6 caracteres e conter pelo menos 1 caractere especial e 1 número',
    path: ['password'],
  });

  type FormData = z.infer<typeof formSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues.name ?? '',
      email:  defaultValues.email ?? '',
      password: '',
      confirmPassword: '',
    },
  })

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = form

  const onSubmit = handleSubmit(async (data: FormData) => {
    const dataToSend = {...data}
    delete dataToSend.confirmPassword

    if (data.password === "") {
      delete dataToSend.password;
    }
    const response = await fetch(`/api/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(data),
    })
    const jsonResponse = await response.json()
    if (response.status !== 200) {
      toast.error('Atualização', {
        description: jsonResponse?.message,
      })
    } else {
      toast.success('Atualização', {
        description: 'Atualização realizada com sucesso',
      })
      router.push('/app')
    }
  })

  return (
    <Card className="mx-auto h-auto w-full max-w-[90%] border-2  border-primary sm:max-w-[30rem]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">Editar Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-2" onSubmit={onSubmit}>
        <div className="space-y-2">
            <Label htmlFor="login">Nome</Label>
            <Input
              id="name"
              placeholder="Insira seu nome"
              type="text"
              {...register('name')}
            />
            <ErrorMessage  errors={errors} name="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login">E-mail</Label>
            <Input
              id="email"
              placeholder="Insira seu login"
              type="text"
              {...register('email')}
            />
            <ErrorMessage  errors={errors} name="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha:</Label>
            <PasswordInput
              id="password"
              placeholder="Insira sua senha"
              {...register('password')}
            />
            <ErrorMessage
              errors={errors}
              name="password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Confirmar Senha:</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Insira sua senha novamente"
              {...register('confirmPassword')}
            />
            <ErrorMessage
              errors={errors}
              name="confirmPassword"
            />
          </div>
          <div className=' w-full space-y-4 pt-4'>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              'Editar Usuário'
            )}
          </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
