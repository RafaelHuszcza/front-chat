'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { useDeleteRoom } from '@/api-uses/rooms'
import { CopyButton } from '@/components/copy-button'
import { DeleteModal } from '@/components/delete-modal'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Room } from '../_data/schema'
import { truncateText } from '@/helpers/truncat-text'

interface RoomsCardProps {
  room: Room
}
export function RoomsCard({ room }: RoomsCardProps) {
  const session = useSession()
  const deleteRoom = useDeleteRoom()

  return (
    <div className="flex h-60  w-52   flex-col gap-2 rounded-md border p-4 shadow-md">
     
      <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <h3 className="font-bol text-center text-lg">{truncateText(room.subject, 15)}</h3>
        </TooltipTrigger>
        <TooltipContent>
          <p>{room.subject}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

      <Button asChild>
        <Link href={`/app/rooms/${room.id}`} scroll={false}>
          Entrar na Sala
        </Link>
      </Button>

      <CopyButton variant="outline" text="Copiar id da sala" value={room.id} />
      {room.ownerId === session.data?.user?.id && (
        <DeleteModal deleteAction={() => deleteRoom.mutate(room.id)} />
      )}
    </div>
  )
}
