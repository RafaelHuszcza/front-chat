import Link from 'next/link'

export function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <p className="text-xs text-muted-foreground">
        &copy; 2024 Chat Distribuído. Todos os direitos reservados.
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link
          href="/terms"
          className="text-xs underline-offset-4 hover:underline"
          prefetch={false}
        >
          Termos de Serviço
        </Link>
        <Link
          href="/privacy"
          className="text-xs underline-offset-4 hover:underline"
          prefetch={false}
        >
          Privacidade
        </Link>
      </nav>
    </footer>
  )
}
