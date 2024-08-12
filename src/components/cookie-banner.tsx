'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Verifica se o cookie de aceitação está presente
    const cookies = document.cookie.split('; ')
    const cookieExists = cookies.some((cookie) =>
      cookie.startsWith('cookieAccepted='),
    )

    if (!cookieExists) {
      setShowBanner(true)
    }
  }, [])
  const refuseCookies = () => {
    // Define o cookie para expirar em 2 dias
    document.cookie = 'cookieAccepted=false; max-age=172800; path=/'
    setShowBanner(false)
  }

  const acceptCookies = () => {
    // Define o cookie para expirar em 1 ano
    document.cookie = 'cookieAccepted=true; max-age=31536000; path=/'
    setShowBanner(false)
  }

  return (
    showBanner && (
      <div className="fixed bottom-0 left-0 z-50 w-full bg-card px-4 py-6 shadow-lg md:rounded-t-xl md:border md:border-input">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-semibold">Usamos cookies</h3>
            <p className="text-muted-foreground">
              Usamos cookies para melhorar sua experiência em nosso site. Ao
              continuar a usar nosso site, você concorda com nossa política de
              cookies.{' '}
              <Link href="/privacy" className="underline">
                Saiba mais
              </Link>
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <Button className="w-full md:w-auto" onClick={acceptCookies}>
              Aceitar Cookies
            </Button>
            <Button className="w-full md:w-auto" onClick={refuseCookies}>
              Recusar Cookies
            </Button>
          </div>
        </div>
      </div>
    )
  )
}
