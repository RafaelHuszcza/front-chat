import { redirect } from 'next/navigation'

import { ResetForm } from '../../_components/reset-form'
export default async function Page({ params }: { params: { token: string } }) {
  const { token } = params
  if (!token) {
    redirect('/auth')
  }
  return <ResetForm token={token} />
}
