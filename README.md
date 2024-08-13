# Nome da Aplicação

Este projeto é uma aplicação web desenvolvida em Next.js que serve como um dos microsserviços do sistema. Ele utiliza Docker para facilitar a instalação e execução, bem como Prisma para a gestão do banco de dados.

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)

## Instalação

Siga os passos abaixo para instalar e executar a aplicação localmente.

### 1. Clone o repositório

Clone o repositório para sua máquina local usando o seguinte comando:

```bash
git clone https://github.com/RafaelHuszcza/front-chat.git
```

### 2. Acesse o diretório do projeto

Navegue até o diretório do projeto:

```bash
cd front-chat
```

### 3. Preencha as variáveis de ambiente

Crie um arquivo .env na raiz do projeto e preencha as variáveis de ambiente conforme necessário. O arquivo .env copy tem exemplo das variáveis que devem ser preenchidas.

### 4. Instale as dependências

Com os containers em execução, instale as dependências do projeto:

```bash
npm install
```

### 5. Inicie a aplicação com Docker

Para configurar e iniciar os containers da aplicação, execute o seguinte comando:

```bash
docker-compose up -d --build
```

### 6. Realize as migrações do banco de dados

Aplique as migrações no banco de dados com o Prisma:

```bash
npx prisma migrate deploy
```

### Observações

Com Esses comandos, toda a sua aplicação ja devem funcionar corretamente e disponível em http://localhost:3000. Você pode também, desligar o container do front-chat, deixando somente o banco rodando e inicial a aplicação como desenvolvimento.

### Inicie o servidor de desenvolvimento

Inicie o servidor de desenvolvimento do Next.js:

```bash
npm run dev
```
