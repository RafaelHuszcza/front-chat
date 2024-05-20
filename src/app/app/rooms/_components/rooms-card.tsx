"use client"
import { DeleteModal } from "@/components/delete-modal";
import { Room } from "../_data/schema";
import { useSession } from "next-auth/react";
import { useDeleteRoom } from "@/api-uses/rooms";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";

interface RoomsCardProps {
  room: Room
}
export function RoomsCard({ room }: RoomsCardProps) {
const session = useSession()
const deleteRoom = useDeleteRoom()


  return (
    <div className="flex h-60  w-52   rounded-md border shadow-md flex-col p-4 gap-2">
      <h3 className="text-center text-lg font-bol">{room.subject}</h3>
      
    
    <Button asChild >
        <Link href={`/app/rooms/${room.id}`}>
          Entrar na Sala
        </Link>
      </Button>
      
       <CopyButton variant="outline" text="Copiar id da sala" value={room.id}/>
      {room.ownerId === session.data?.user?.id && (
      <DeleteModal deleteAction={()=>deleteRoom.mutate(room.id)}/>
    )} 
      
      
    </div>
  )
}
