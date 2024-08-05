import { CopyButton } from '@/components/copy-button'
import { Member, Room } from './chat'
import { Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function Header({ room, members }: { room: Room, members: Member[] }) {
  const [showUsers, setShowUsers] = useState(false)
  const toggleShowUsers = () => {
    setShowUsers((prev) => !prev)}

  return (
    <header className="flex h-12 items-center justify-between   px-4 border-b">
      <Button variant="ghost" className="block sm:hidden" onClick={toggleShowUsers}>
      <Users />
      </Button>
      <Dialog open={showUsers} onOpenChange={toggleShowUsers}>
      <DialogContent className="flex w-auto flex-col rounded-sm overflow-auto max-h-[70%]">
        <DialogHeader>
          <DialogTitle className="text-center">Lista de membros</DialogTitle>
        </DialogHeader>
        <main className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden p-4">
        {members.map((member) => (
          <div key={member.id} className="flex h-12 items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div >
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
      
      <h3>Assunto: {room.subject}</h3>
      <CopyButton  variant="ghost" text="Copiar id" value={room.id} />
    </header>
  )
}
