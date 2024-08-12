'use client'
import { useEffect, useRef } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Message } from '@/providers/message-provider'

export default function Messages({
  messages,
  userId,
}: {
  messages: Message[]
  userId: string
}) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <main className="scrollbar-thin scrollbar-thumb scrollbar-hidden flex flex-1 flex-col gap-4 overflow-y-auto p-6">
      {messages.map((message) => {
        if (message.type === 'message') {
          return (
            <div
              key={message.id}
              className={cn([
                'flex items-start gap-4',
                message.authorId === userId && 'flex-row-reverse ',
              ])}
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback>{message.author.name[0]}</AvatarFallback>
              </Avatar>
              <div
                className={cn([
                  'grid max-w-[70%] items-start gap-1 rounded-lg  px-4 py-3 text-sm shadow-lg',
                  message.authorId === userId
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted',
                ])}
              >
                <div className="flex items-center gap-2">
                  <div className="font-bold">{message.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <div>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          )
        }
        if (message.type === 'join') {
          return (
            <div key={message.id} className="text-center text-green-500">
              {message.author.name} entrou na sala
            </div>
          )
        }
        if (message.type === 'leave') {
          return (
            <div key={message.id} className="text-center text-destructive">
              {message.author.name} saiu da sala
            </div>
          )
        }
        return null
      })}
      <div ref={messagesEndRef} />
    </main>
  )
}
