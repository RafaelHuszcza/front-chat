'use client'

import Link from 'next/link'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Footer } from '@/components/footer'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
export default function Home() {
  const router = useRouter()
  const [imageModal, setImageModal] = useState(false)
  const closeImageModal = () => setImageModal(false)

  const [imageModal2, setImageModal2] = useState(false)
  const closeImageModal2 = () => setImageModal2(false)
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Conecte-se com pessoas que pensam como você em tempo real
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Crie e entre em salas de bate-papo sobre qualquer assunto,
                    participe de discussões e construa conexões significativas.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/app/rooms"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Criar Sala de Chat
                  </Link>
                </div>
              </div>
              <Image
                src="/example-mobile.png"
                width="450"
                height="200"
                alt="Chat-distribuído"
                className="aspect-video object-contain rounded-xl  sm:w-full lg:order-last cursor-zoom-in image-zoom"
                onClick={() => setImageModal2(true)}
              />
              {imageModal2 && (
        <Dialog open={imageModal2} onOpenChange={closeImageModal2}>
          <DialogContent className="p-0 max-w-[90vw] max-h-[90vh] overflow-hidden rounded-lg">
            <div className="relative w-full h-full flex justify-center">
              <Image
                src="/example-mobile.png"
                width="450"
                height="1920"
                alt="Chat-distribuído"
                className="object-center"
              />
              <div>
               
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Principais Recursos
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Participe de conversas em tempo real.
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Crie salas de bate-papo personalizadas, entre em salas
                  existentes e participe de discussões em tempo real sobre
                  qualquer assunto. Mantenha-se conectado com pessoas que
                  compartilham seus interesses e construa relacionamentos
                  significativos.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/example.png"
                width="1280"
                height="1920"
                alt="Chat-distribuído"
                className="aspect-video  rounded-xl object-cover object-center sm:w-full hidden sm:block lg:order-last cursor-zoom-in image-zoom "
                onClick={() => setImageModal(true)}
              />
              {imageModal && (
        <Dialog open={imageModal} onOpenChange={closeImageModal}>
          <DialogContent className="p-0 max-w-[90vw] max-h-[90vh] overflow-hidden rounded-lg">
            <div className="relative w-full h-full">
              <Image
                src="/example.png"
                width={1280}
                height={1920}
                alt="Chat-distribuído"
                className="w-full h-full object-contain"
              />
              <div>
               
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    

              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Salas de Bate-Papo Personalizadas
                      </h3>
                      <p className="text-muted-foreground">
                        Crie salas de bate-papo sobre qualquer assunto e convide
                        outras pessoas para participar.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Discussões em Tempo Real
                      </h3>
                      <p className="text-muted-foreground">
                        Participe de conversas em tempo real e mantenha-se
                        conectado com sua comunidade.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Descubra Novas Conexões
                      </h3>
                      <p className="text-muted-foreground">
                        Encontre e conecte-se com pessoas que compartilham
                        interesses semelhantes em diversos tópicos.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Construa Conexões Significativas
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Participe de discussões, compartilhe ideias e forme
                relacionamentos duradouros com pessoas que pensam como você.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                href="/app/rooms"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Criar Sala de Bate-papo
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Junte-se à nossa comunidade em crescimento
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Conecte-se com pessoas que compartilham seus interesses,
                participe de discussões significativas e construa
                relacionamentos duradouros.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2" onSubmit={()=> router.push("/auth")}>
                <Input
                  type="email"
                  placeholder="Informe seu e-mail"
                  className="max-w-lg flex-1"
                />
                <Button type="submit">Cadastre-se</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Inscreva-se para ser notificado quando lançarmos.{' '}
                <Link
                  href="/terms"
                  className="underline underline-offset-2"
                  prefetch={false}
                >
                  Termos &amp; Condições
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}
