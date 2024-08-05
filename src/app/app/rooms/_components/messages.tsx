import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

import { Message } from './chat'
export default function Messages({
  messages,
  userId,
}: {
  messages: Message[]
  userId: string
}) {
  return (
    <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn([
            'flex items-start gap-4',
            message.user.id === userId && 'flex-row-reverse ',
          ])}
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback>{message.user.name[0]}</AvatarFallback>
          </Avatar>
          <div
            className={cn([
              'grid max-w-[70%] items-start gap-1 rounded-lg  px-4 py-3 text-sm shadow-lg',
              message.user.id === userId
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted',
            ])}
          >
            <div className="flex items-center gap-2">
              <div className="font-bold">{message.user.name}</div>
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
      ))}
    </main>
  )
}
