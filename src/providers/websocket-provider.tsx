import React, { createContext, useCallback, useContext, useState } from 'react'

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
  const emitChatMessage = useCallback(
    (roomId: string, userId: string, content: string) => {
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
    },
    [currentSocket],
  )

  const createConnection = (
    roomId: string,
    userId: string,
  ): WebSocket | null => {
    if (!roomId) return null
    if (currentSocket) return null
    try {
      const socket = new WebSocket(`ws://localhost:3333/`)
      socket.onopen = () => {
        if (reconnecting) {
          setReconnecting(false)
        }
        const message = {
          type: 'join',
          content: '',
          authorId: userId,
          roomId,
        }
        socket.send(JSON.stringify(message))
        console.log('WebSocket connection established')
      }

      socket.onclose = (event) => {
        if (!reconnecting) {
          setReconnecting(true)
        }
        const message = {
          type: 'leave',
          content: '',
          authorId: userId,
          roomId,
        }
        socket.send(JSON.stringify(message))
        console.log('WebSocket connection closed:', event)
      }
      socket.onerror = (error) => {
        if (!reconnecting) {
          setReconnecting(true)
        }
        console.error('WebSocket connection error:', error)
      }
      return socket
    } catch (error) {
      console.error('Error creating connection:', error)
      return null
    }
  }

  const endConnection = () => {
    setCurrentSocket(null)
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
