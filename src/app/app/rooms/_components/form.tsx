'use client'

import { CornerDownLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWebSocket } from '@/providers/websocket-provider'
import { useMessages } from '@/providers/message-provider'

interface FormChat {
roomId: string
userId: string
className?: string

}

export function Form({ roomId, userId, className }: FormChat) {

  const formSchema = z.object({
    message: z
      .string({ required_error: 'Nome é requerido' }).min(1, 'A mensagem deve conter mais de 1 caracteres'),
  })
  type FormData = z.infer<typeof formSchema>
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  })
  
  const { emitChatMessage } = useWebSocket()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
  } = form
     // TODO: Remover funcionalidades nao usadas e verificar funcionalidade correta apos a conexão com o websocket
     const { messages, clearMessages, appendMessage } = useMessages()
  const onSubmit = handleSubmit( (data: FormData) => {
     emitChatMessage(roomId,userId,data.message)
    //  appendMessage({
    //     id: messages.length + 1,
    //     authorId: "aa",
    //     roomId,
    //     content: data.message,
    //     type: 'message',
    //     createdAt: new Date().toISOString(),
    //     author: {
    //       name: 'Luan Simões',
    //     },
    //     }
    //  )
    //  clearMessages()
     reset()
  })
  return (
    <form
      className={cn([
        'relative w-full overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring ',
        className,
      ])}
      onSubmit={onSubmit}
    >
      <Label htmlFor="message" className="sr-only">
        Mensagem
      </Label>
      <Textarea
        id="message"
    {...register('message')}
        placeholder="Escreva sua mensagem..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0">
        <Button type="submit" size="sm" className="ml-auto gap-1.5" disabled={isSubmitting}>
          Enviar
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  )
}
