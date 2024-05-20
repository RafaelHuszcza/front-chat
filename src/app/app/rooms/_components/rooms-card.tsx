'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { useDeleteRoom } from '@/api-uses/rooms'
import { CopyButton } from '@/components/copy-button'
import { DeleteModal } from '@/components/delete-modal'
import { Button } from '@/components/ui/button'

import { Room } from '../_data/schema'

interface RoomsCardProps {
  room: Room
}
export function RoomsCard({ room }: RoomsCardProps) {
  const session = useSession()
  const deleteRoom = useDeleteRoom()

  return (
    <div className="flex h-60  w-52   flex-col gap-2 rounded-md border p-4 shadow-md">
      <h3 className="font-bol text-center text-lg">{room.subject}</h3>

      <Button asChild>
        <Link href={`/app/rooms/${room.id}`}>Entrar na Sala</Link>
      </Button>

      <CopyButton variant="outline" text="Copiar id da sala" value={room.id} />
      {room.ownerId === session.data?.user?.id && (
        <DeleteModal deleteAction={() => deleteRoom.mutate(room.id)} />
      )}
    </div>
  )
}
