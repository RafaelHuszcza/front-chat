"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@/components/error-message'
import { z } from "zod"
import { useForm } from "react-hook-form"

import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function JoinRoomModal() {
  const router = useRouter()
  const formSchema = z.object({
    id: z.string({ required_error: 'Nome é requerido' }).min(10, { message: 'O Id deve conter mais de 10 caracteres' }),
  })
  type FormData = z.infer<typeof formSchema>
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
    }
  })
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = form

  const onSubmit = handleSubmit(async (data: FormData) => {
    router.push(`/app/rooms/${data.id}`)
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Entrar com Id</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader >
          <DialogTitle>Entrar com Id</DialogTitle>
        </DialogHeader>
        <form id="form" className="grid gap-4 py-4" onSubmit={onSubmit}>
        <div className="space-y-2">
            <Label htmlFor="id" className="text-right">
              Id:
            </Label>
            <Input id="id"
              placeholder="Insira o id da sala"
              type="text"
              {...register('id')} />
               <ErrorMessage
              errors={errors}
              name="id"
            />
          </div>
        </form>
        <DialogFooter>
          <Button form="form" disabled={isSubmitting} type="submit">{isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : "Entrar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
