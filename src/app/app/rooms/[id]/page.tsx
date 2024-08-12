import { redirect } from 'next/navigation'

import { getServerSessionWithAuth } from '@/services/auth'

import { Chat } from '../_components/chat'

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSessionWithAuth()
  if (!session) {
    redirect('/auth')
  }

  return <Chat roomId={params.id} session={session} />
}
