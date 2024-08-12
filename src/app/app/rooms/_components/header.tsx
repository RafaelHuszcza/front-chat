import { Users } from 'lucide-react'
import { useState } from 'react'

import { CopyButton } from '@/components/copy-button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Member, Room } from './chat'
import { truncateText } from '@/helpers/truncat-text'

export function Header({
  room,
  members,
  leaveRoom,
}: {
  room: Room
  members: Member[]
  leaveRoom: () => void
}) {
  const [showUsers, setShowUsers] = useState(false)
  const toggleShowUsers = () => {
    setShowUsers((prev) => !prev)
  }

  

  return (
    <header className="flex h-12 items-center justify-between   border-b px-4">
      <Button
        variant="ghost"
        className="block sm:hidden"
        onClick={toggleShowUsers}
      >
        <Users />
      </Button>
      <Dialog open={showUsers} onOpenChange={toggleShowUsers}>
        <DialogContent className="flex max-h-[70%] w-auto flex-col overflow-auto rounded-sm p-8">
          <DialogHeader>
            <DialogTitle className="text-center">Lista de membros - {members.length}</DialogTitle>
          </DialogHeader>
          <main className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden p-4">
            {members.map((member) => (
              <div key={member.id} className="flex h-12 items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {member.email}
                  </div>
                </div>
              </div>
            ))}
          </main>
        </DialogContent>
      </Dialog>
      <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <h3 className="w-full">{truncateText(room.subject, 10)}</h3>
        </TooltipTrigger>
        <TooltipContent>
          <p>{room.subject}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
      
      <CopyButton variant="ghost" text="Copiar id" value={room.id} />
      <Button variant="destructive" onClick={leaveRoom}>
        Sair
      </Button>
    </header>
  )
}
