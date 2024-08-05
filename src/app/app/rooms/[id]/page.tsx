import { Chat } from '../_components/chat'

export default function Page({ params }: { params: { id: string } }) {
  return <Chat id={params.id} />
}
