'use client'

import { LoaderIcon } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { useEffect, useRef, useState } from 'react'

import { useRoom } from '@/api-uses/rooms/use-room'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useMessages } from '@/providers/message-provider'
import { useWebSocket } from '@/providers/websocket-provider'

import { Form } from './form'
import { Header } from './header'
import Messages from './messages'
import OnlineMembersAside from './online-members-aside'

export interface Member {
  name: string
  email: string
  id: string
}
export interface Room {
  id: string
  subject: string
}

export function Chat({
  roomId,
  session,
}: {
  roomId: string
  session: Session
}) {
  const { createConnection, currentSocket, setCurrentSocket, reconnecting } =
    useWebSocket()
    const initialCheckDone = useRef(false);
  const [members, setMembers] = useState<Member[]>([])

  const { messages, clearMessages, appendMessage } = useMessages()
  const { data: room, isSuccess, isLoading, isError } = useRoom(roomId)
  const router = useRouter()
  useEffect(() => {
    if (!room || !isSuccess) return
    //TODO : Remover mock de membros e verificar conexão com websocket
    // setMembers([
    //   {
    //     name: "Rafael Machado",
    //     email : "rafaelhuszcza@gmail.com",
    //     id: session.user.id,
    //   },
    //   {
    //     name: "Luan Simões",
    //     email : "luansds@gmail.com",
    //     id: "aa",
    //   },
    //   {
    //     name: "Leonardo Silva",
    //     email : "leosinhosdsilva@gmail.com",
    //     id: "bb",
    //   },
    // ])
    const socket = createConnection(room.id, session.user.id)
    if (socket) {
      setCurrentSocket(socket)
    }
  }, [
    session.user.id,
    room,
    createConnection,
    isSuccess,
    setCurrentSocket,
    currentSocket,
  ])
  

  useEffect(() => {
    if (!initialCheckDone.current) {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].roomId !== roomId) {
          clearMessages();
          break;
        }
      }
      initialCheckDone.current = true;
    }
  }, [messages, roomId, clearMessages]);
  if(isError) router.push('/app/rooms/not-found')
  if (!currentSocket) return 'Carregando...'

  currentSocket.onmessage = (event) => {
    const message = JSON.parse(event.data)
    console.log('Received message:', message)
    if (message.type === 'members') {
      setMembers(message.members)
    } else if (
      message.type === 'message' ||
      message.type === 'join' ||
      message.type === 'leave'
    ) {
      appendMessage(message)
    }
  }
  const leaveRoom = () => {
    clearMessages()
    router.push('/app/rooms')
  }
 
  return (
    <>
      {reconnecting && (
        <Dialog
          open={reconnecting}
          onOpenChange={() => router.push('/app/rooms')}
        >
          <DialogContent className="p-6 sm:max-w-sm">
            <div className="flex flex-col items-center justify-center gap-4">
              <LoaderIcon className="h-8 w-8 animate-spin text-primary" />
              <p className="text-center text-lg font-medium">
                Reconectando ao servidor
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Por favor aguarde enquanto restabelecemos a conexão
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {isLoading && !reconnecting && (
        <Dialog defaultOpen>
          <DialogContent className="p-6 sm:max-w-sm">
            <div className="flex flex-col items-center justify-center gap-4">
              <LoaderIcon className="h-8 w-8 animate-spin text-primary" />
              <p className="text-center text-lg font-medium">
                Carregando informações
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {isSuccess && (
        <div className="flex h-full w-full flex-1">
          <OnlineMembersAside members={members} />
          <div className="flex w-full flex-col">
            <Header room={room} members={members} leaveRoom={leaveRoom} />
            <Messages messages={messages} userId={session.user.id} />
            <div className="pb-4 pl-4 pr-4">
              <Form roomId={room.id} userId={session.user.id}/>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
