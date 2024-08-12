'use client'


import { Header } from '@/components/header'

import { Footer } from '@/components/footer'
export default function Privacy() {
  return (
    <>
      <Header />
      <main className="flex-1">
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Política de Privacidade</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Na Chat Distribuído, estamos comprometidos em proteger sua privacidade. Esta política de privacidade explica como
            coletamos, usamos e protegemos suas informações pessoais.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl space-y-8 py-12">
        <div>
          <h2 className="text-2xl font-bold">1. Informações que Coletamos</h2>
          <p className="text-muted-foreground">
            Coletamos informações pessoais que você nos fornece, como seu nome, endereço de e-mail e informações do
            perfil do usuário. Também coletamos informações sobre seu uso da Plataforma, incluindo seu IP, tipo de
            navegador e informações do dispositivo.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">2. Como Usamos Suas Informações</h2>
          <p className="text-muted-foreground">
            Usamos suas informações pessoais para fornecer e melhorar a Plataforma, para nos comunicarmos com você e
            para cumprir com obrigações legais. Também podemos usar suas informações para fins de marketing, mas você
            pode optar por não receber essas comunicações a qualquer momento.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">3. Compartilhamento de Suas Informações</h2>
          <p className="text-muted-foreground">
            Podemos compartilhar suas informações pessoais com prestadores de serviços terceirizados que nos auxiliam na
            operação da Plataforma. Também podemos compartilhar suas informações com as autoridades legais ou outras
            agências governamentais conforme exigido por lei.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">4. Segurança dos Dados</h2>
          <p className="text-muted-foreground">
            Tomamos medidas razoáveis para proteger suas informações pessoais contra acesso, uso ou divulgação não
            autorizados. No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico é 100%
            seguro, e não podemos garantir a segurança absoluta de suas informações.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">5. Seus Direitos</h2>
          <p className="text-muted-foreground">
            Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você também pode solicitar
            que limitemos ou parem de processar suas informações. Se tiver alguma dúvida ou preocupação sobre nossas
            práticas de privacidade, entre em contato conosco pelo e-mail privacy@chatroom.com.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">6. Alterações nesta Política</h2>
          <p className="text-muted-foreground">
            Podemos atualizar esta política de privacidade de tempos em tempos. Notificaremos você sobre quaisquer
            alterações publicando a nova política na Plataforma. Seu uso contínuo da Plataforma após essas mudanças
            constitui sua aceitação da nova política.
          </p>
        </div>
      </div>
    </div>
  </section>
</main>

      <Footer/>

      </>
  )
}
