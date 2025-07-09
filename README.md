<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

---

## 💡 Sobre o Projeto

Este é um backend construído com NestJS e Prisma para gerenciar **transações financeiras**, permitindo que o usuário:

- 💰 Crie transações (INCOME e OUTCOME)
- ✏️ Edite transações
- ❌ Exclua transações com confirmação por modal (no frontend)
- 📄 Liste transações com paginação (via `skip` e `take`)
- 📊 Obtenha totais de entrada, saída e saldo
- ⚡ Integração com TanStack Query no frontend para cache e atualização reativa

---

## 🚀 Funcionalidades Implementadas

- [x] **CRUD de Transações** com validações via `class-validator`
- [x] **Paginação de Dados** no backend via `skip`/`take` do Prisma
- [x] **Cálculo de totais** (`totalIncome`, `totalOutcome`, `total`)
- [x] **Cache automático** via TanStack Query no frontend
- [x] **Confirmação de exclusão** com modal (Tailwind UI)
- [x] **Testes unitários completos** com Jest para o serviço de transações
- [x] **Banco exclusivo para testes** via `.env.test`

---

## 🛠️ Instalação

```bash
# Instalar dependências
$ pnpm install

▶️ Execução

# Modo desenvolvimento
$ pnpm run start:dev

# Modo produção
$ pnpm run start:prod

🧪 Testes

# Executar testes unitários
$ pnpm run test

# Executar testes de cobertura
$ pnpm run test:cov

📃 Licença
Este projeto está licenciado sob a licença MIT.
