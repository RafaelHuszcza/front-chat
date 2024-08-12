import Link from 'next/link'


export default function NotFound() {
  return (
    <main className="flex h-full items-center bg-background p-16 text-foreground">
     <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Ops, a sala que você está procurando não existe!
        </h1>
        <p className="mt-4 text-muted-foreground">
        Não conseguimos encontrar a sala que você estava tentando acessar. Por favor, verifique a URL ou volte para a página de salas.
        </p>
        <div className="mt-6">
          <Link
            href="/app/rooms"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Vá para a página de salas
          </Link>
        </div>
      </div>
    </main>
  )
}
