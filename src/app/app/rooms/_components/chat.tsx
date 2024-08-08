'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { socket } from '@/socket'

import { Form } from './form'
import { Header } from './header'
import Messages from './messages'
import OnlineMembersAside from './online-members-aside'
export interface Member {
  name: string
  email: string
  id: string
}
export interface Message {
  id: string
  content: string
  user: Member
  createdAt: Date
}
export interface Room {
  id: string
  subject: string
}
export function Chat({ id }: { id: string }) {
  const { data } = useSession()
  if (!data) return null
  // const [isConnected, setIsConnected] = useState(false)
  // const [transport, setTransport] = useState('N/A')

  // useEffect(() => {
  //   if (socket.connected) {
  //     onConnect()
  //   }
  //   function onConnect() {
  //     setIsConnected(true)
  //     setTransport(socket.io.engine.transport.name)

  //     socket.io.engine.on('upgrade', (transport) => {
  //       setTransport(transport.name)
  //     })
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false)
  //     setTransport('N/A')
  //   }

  //   socket.on('connect', onConnect)
  //   socket.on('disconnect', onDisconnect)

  //   return () => {
  //     socket.off('connect', onConnect)
  //     socket.off('disconnect', onDisconnect)
  //   }
  // }, [])

  const members: Member[] = [
    {
      name: 'John Doe',
      email: 'rafael@gmail.com',
      id: 'dasdsada1',
    },
    {
      name: 'Alice Smith',
      email: 'asdsad@gmail.com',
      id: 'dasdsada2',
    },
    {
      name: 'Rafael Machado',
      email: 'asdsad@gmail.com',
      id: 'clzg9fz7v0000zkofk184xsiv',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },

    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
    {
      name: 'teeste',
      email: 'asdsad@gmail.com',
      id: '21321',
    },
  ]
  const messages: Message[] = [
    {
      id: '1',
      content: 'Hey everyone! How is it going?',
      user: members[0],
      createdAt: new Date('2021-09-01T14:41:00'),
    },
    {
      id: '2',
      content: 'Hi John, doing great! How about you?',
      user: members[2],
      createdAt: new Date('2021-09-01T14:42:00'),
    },
    {
      id: '3',
      content: 'Doing well, thanks for asking!',
      user: members[0],
      createdAt: new Date('2021-09-01T14:43:00'),
    },
    {
      id: '4',
      content: 'Has anyone seen the latest episode of the show?',
      user: members[1],
      createdAt: new Date('2021-09-01T14:44:00'),
    },
    {
      id: '5',
      content: 'Not yet, planning to watch it tonight.',
      user: members[3],
      createdAt: new Date('2021-09-01T14:45:00'),
    },
    {
      id: '6',
      content: 'It was amazing! So many twists and turns.',
      user: members[2],
      createdAt: new Date('2021-09-01T14:46:00'),
    },
    {
      id: '7',
      content: 'Can’t wait to see it!',
      user: members[0],
      createdAt: new Date('2021-09-01T14:47:00'),
    },
    {
      id: '8',
      content: 'What are your weekend plans?',
      user: members[0],
      createdAt: new Date('2021-09-01T14:48:00'),
    },
    {
      id: '9',
      content: 'Thinking about going hiking if the weather is nice.',
      user: members[3],
      createdAt: new Date('2021-09-01T14:49:00'),
    },
    {
      id: '10',
      content: 'That sounds fun! I might join you.',
      user: members[2],
      createdAt: new Date('2021-09-01T14:50:00'),
    },
  ]
  const room: Room = {
    id: 'clzgb76zi0001uh26a04cp35o',
    subject: 'General',
  }

  return (
    <div className="flex h-full w-full flex-1">
      <OnlineMembersAside members={members} />
      <div className="flex w-full flex-col">
        <Header room={room} members={members} />
        <Messages messages={messages} userId={data.user.id} />
        <div className="pb-4 pl-4 pr-4">
          <Form />
        </div>
      </div>
      {/* <p>{id}</p>
      <p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
      <p>Transport: {transport}</p> */}
    </div>
  )
}
