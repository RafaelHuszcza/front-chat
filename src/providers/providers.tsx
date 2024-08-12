'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from '@/components/ui/sonner'

import { ChatMessagesProvider } from './message-provider'
import { ThemeProvider } from './theme-provider'
import { WebSocketProvider } from './websocket-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({})

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <WebSocketProvider>
            <ChatMessagesProvider>{children}</ChatMessagesProvider>
          </WebSocketProvider>
          <Toaster richColors position="top-right" closeButton />
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
