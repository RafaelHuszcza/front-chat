import { redirect } from 'next/navigation'

import { Header } from '@/components/header'
import { getServerSessionWithAuth } from '@/services/auth'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSessionWithAuth()
  if (session) {
    redirect('/app')
  }
  return (
    <>
      <Header />
      <main className="flex h-[calc(100vh-5rem)] items-center justify-center">
        {children}
      </main>
    </>
  )
}
