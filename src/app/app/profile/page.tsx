import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getServerSessionWithAuth } from '@/services/auth'

import { DefaultValues, UserForm } from './_components/user-form'

export default async function Page() {
  const session = await getServerSessionWithAuth()
  const id = session?.user?.id
  if (!id) redirect('/app/rooms')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
    {
      headers: headers(),
      cache: 'no-store',
    },
  )
  if (response.status !== 200) redirect('/app')
  const jsonResponse = await response.json()

  return (
    <UserForm
      id={id}
      defaultValues={jsonResponse as unknown as DefaultValues}
    />
  )
}
