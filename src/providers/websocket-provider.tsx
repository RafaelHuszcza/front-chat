import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface WebSocketContextValue {
  createConnection: (roomId: string, userId: string) => WebSocket | null
  emitChatMessage: (content: string, roomId: string, userId: string) => void
  endConnection: () => void
  setCurrentSocket: (socket: WebSocket) => void
  currentSocket: WebSocket | null
  reconnecting: boolean
}

const WebSocketContext = createContext<WebSocketContextValue>({
  createConnection: () => null,
  emitChatMessage: () => {},
  setCurrentSocket: () => {},
  endConnection: () => {},
  currentSocket: null,
  reconnecting: false,
})

interface WebSocketProviderProps {
  children: React.ReactNode
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [currentSocket, setCurrentSocket] = useState<WebSocket | null>(null)
  const [reconnecting, setReconnecting] = useState(true)
  useEffect(() => {
    return () => {
      if (currentSocket) {
        currentSocket.close()
        setCurrentSocket(null)
      }
    }
  }, [currentSocket])

  const emitChatMessage = (roomId: string, userId: string, content: string) => {
    if (!currentSocket) {
      console.log('No socket connection')
      return
    }

    const message = {
      type: 'message',
      content,
      authorId: userId,
      roomId,
    }
    currentSocket.send(JSON.stringify(message))
  }
  const router = useRouter()
  const createConnection = (
    roomId: string,
    userId: string,
  ): WebSocket | null => {
    if (!userId) return null
    if (!roomId) return null
    if (currentSocket) return null
    const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL
    if (!url) {
      console.error('WebSocket URL not found')
      return null
    }
    try {
      const socket: WebSocket = new WebSocket(url, 'chat')

      socket.onopen = () => {
        const message = {
          type: 'join',
          content: '',
          authorId: userId,
          roomId,
        }
        socket.send(JSON.stringify(message))
        console.log('WebSocket connection established')
        if (reconnecting) {
          setReconnecting(false)
        }
      }
      socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event)
        if (reconnecting) return
        setReconnecting(true)
      }
      socket.onerror = () => {
        console.log('WebSocket connection error, reconnecting...')
        if (reconnecting) return
        setReconnecting(true)
      }
      return socket
    } catch (error) {
      console.log('Error to connecto websocket:', error)
      router.push('/app/rooms')
      return null
    }
  }

  const endConnection = () => {
    if (currentSocket) {
      currentSocket.close()
      setCurrentSocket(null)
    }
  }

  return (
    <WebSocketContext.Provider
      value={{
        setCurrentSocket,
        createConnection,
        emitChatMessage,
        endConnection,
        currentSocket,
        reconnecting,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  )
}

export function useWebSocket() {
  return useContext(WebSocketContext)
}
