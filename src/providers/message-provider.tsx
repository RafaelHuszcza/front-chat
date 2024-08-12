'use client'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { Member } from '@/app/app/rooms/_components/chat'

export type Message =
  | {
      id: number
      authorId: string
      roomId: string
      content: string
      type: string
      author: {
        name: string
      }
      createdAt: string
    }
  | {
      type: string
      content: Member[]
    }

type ChatMessagesContextType = {
  messages: Message[]
  appendMessage: (message: Message) => void
  clearMessages: () => void
}

const ChatMessagesContext = createContext<ChatMessagesContextType>({
  messages: [],
  appendMessage: () => {},
  clearMessages: () => {},
})

interface ChatMessagesContextProviderProps {
  children: ReactNode
}

const ChatMessagesProvider = ({
  children,
}: ChatMessagesContextProviderProps) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return []

    const storedMessages = window.localStorage.getItem('chatMessages')
    if (storedMessages) {
      try {
        return JSON.parse(storedMessages) as Message[]
      } catch (error) {
        console.error('Failed to parse messages:', error)
        return []
      }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  function appendMessage(message: Message) {
    setMessages((prev) => [...prev, message])
  }
  function clearMessages() {
    setMessages([])
  }

  return (
    <ChatMessagesContext.Provider
      value={{ appendMessage, messages, clearMessages }}
    >
      {children}
    </ChatMessagesContext.Provider>
  )
}

function useMessages() {
  const context = useContext(ChatMessagesContext)
  if (context === undefined) {
    throw new Error('useMessages must be used within a ChatMessagesContext')
  }
  return context
}

export { ChatMessagesProvider, ChatMessagesContext, useMessages }
