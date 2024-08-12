'use client'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Terms() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Termos de Serviço
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Bem-vindo à nossa plataforma de salas de bate-papo. Ao usar
                  nossos serviços, você concorda com estes termos de serviço.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-8 py-12">
              <div>
                <h2 className="text-2xl font-bold">1. Introdução</h2>
                <p className="text-muted-foreground">
                  Estes termos de serviço &quot;Termos&quot; regem seu acesso e
                  uso da plataforma de salas de bate-papo, incluindo qualquer
                  conteúdo, funcionalidade e serviços oferecidos na plataforma a
                  &quot;Plataforma&quot;. Ao usar a Plataforma, você concorda em
                  estar vinculado a estes Termos.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">2. Contas de Usuário</h2>
                <p className="text-muted-foreground">
                  Para usar a Plataforma, você deve criar uma conta. Você é
                  responsável por manter a confidencialidade da sua conta e
                  senha, e por restringir o acesso ao seu computador. Você
                  concorda em aceitar a responsabilidade por todas as atividades
                  que ocorram sob sua conta ou senha.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">3. Conduta do Usuário</h2>
                <p className="text-muted-foreground">
                  Você concorda em usar a Plataforma apenas para fins legais e
                  de uma maneira que não infrinja os direitos de, ou restrinja
                  ou impeça o uso e aproveitamento da Plataforma por, qualquer
                  terceiro. Isso inclui, mas não se limita a, conduta que seja
                  ilegal, ou que possa assediar, difamar, abusar, perseguir,
                  ameaçar ou de outra forma violar os direitos legais de outros.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  4. Propriedade Intelectual
                </h2>
                <p className="text-muted-foreground">
                  A Plataforma e todo o seu conteúdo, funcionalidades e recursos
                  são propriedade da Chat Distribuído e estão protegidos por
                  leis de direitos autorais, marcas registradas e outras leis de
                  propriedade intelectual. Você não pode modificar, copiar,
                  distribuir, transmitir, exibir, reproduzir ou criar trabalhos
                  derivados da Plataforma.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">5. Rescisão</h2>
                <p className="text-muted-foreground">
                  A Chat Distribuído pode rescindir ou suspender seu acesso à
                  Plataforma imediatamente, sem aviso prévio ou
                  responsabilidade, por qualquer motivo, incluindo, sem
                  limitação, se você violar estes Termos.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  6. Limitação de Responsabilidade
                </h2>
                <p className="text-muted-foreground">
                  Em nenhuma hipótese a Chat Distribuído será responsável por
                  quaisquer danos indiretos, especiais, incidentais ou
                  consequenciais relacionados ao seu uso da Plataforma. A
                  responsabilidade total da Chat Distribuído não deve exceder
                  $100.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">7. Lei Aplicável</h2>
                <p className="text-muted-foreground">
                  Estes Termos e seu uso da Plataforma serão regidos e
                  interpretados de acordo com as leis do estado de [Estado], sem
                  dar efeito a quaisquer princípios de conflitos de leis.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
