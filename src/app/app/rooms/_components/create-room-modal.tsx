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
import { useCreateRoom } from "@/api-uses/rooms"
import { LoaderCircle } from "lucide-react"

export function CreateRoomModal() {
  const formSchema = z.object({
    subject: z.string({ required_error: 'Nome é requerido' }).min(3, 'O Assunto deve conter mais de 3 caracteres'),
  })
  type FormData = z.infer<typeof formSchema>
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
    }
  })
  const createRoom = useCreateRoom()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = form

  const onSubmit = handleSubmit(async (data: FormData) => {
    await createRoom.mutateAsync(data)
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Criar nova sala</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader >
          <DialogTitle>Criar nova sala</DialogTitle>
        </DialogHeader>
        <form id="form" className="grid gap-4 py-4" onSubmit={onSubmit}>
        <div className="space-y-2">
            <Label htmlFor="subject" className="text-right">
              Assunto
            </Label>
            <Input id="subject"
              placeholder="Insira o assunto da nova sala"
              type="text"
              {...register('subject')} />
               <ErrorMessage
              errors={errors}
              name="subject"
            />
          </div>
        </form>
        <DialogFooter>
          <Button form="form" disabled={isSubmitting} type="submit">{isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : "Criar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
