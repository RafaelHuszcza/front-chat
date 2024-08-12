'use client'
import { ChatMessagesProvider } from '@/providers/message-provider'
import { WebSocketProvider } from '@/providers/websocket-provider'

export const ChatProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider>
      <ChatMessagesProvider>{children}</ChatMessagesProvider>
    </WebSocketProvider>
  )
}
