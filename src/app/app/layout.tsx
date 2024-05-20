import { Header } from '@/components/header'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="flex h-[calc(100%-5rem)] items-center justify-center ">
        {children}
      </main>
    </>
  )
}
