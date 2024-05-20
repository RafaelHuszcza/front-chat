import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex h-full items-center bg-background p-16 text-foreground">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold dark:text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Desculpe, não conseguimos encontrar essa página
          </p>
          <p className="mb-8 mt-4 ">
            Mas não se preocupe, você pode encontrar muitas outras coisas em
            nossa página inicial.
          </p>
          <Button asChild variant="default">
            <Link href={'/'} rel="noopener noreferrer">
              Voltar para a Página Inicial
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
