import { Header } from "@/components/header"
import { getServerSessionWithAuth } from "@/services/auth"
import { redirect } from "next/navigation"

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
    <><Header/>
    <main className="flex flex-1 items-center justify-center">
        {children}</main>
        </>
  )
}
