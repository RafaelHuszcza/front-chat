import { ChatProviders } from '@/providers/chat-providers'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ChatProviders>{children}</ChatProviders>
}
