<h3 align="center">
  Room Finder API  🛏️ 🛏️
</h3>

## Sumário
---
- [Instalação](#instalação)
- [Comandos](#comandos)
- [API](#api)
- [Overview](#overview)

## Instalação
---
### 1. Clone o repositório:

```bash
$ git clone https://github.com/pedroamaral91/room-finder.git
```

### 2. Instale as dependências
```bash
$ cd room-finder
$ yarn
```
### 3. Rode o projeto
```bash
$ yarn dev
```

## Comandos
---
- `yarn test`: Testes unitários da aplicação
- `yarn dev`: Roda a aplicação em modo de desenvolvimento

## API
---
A API contempla apenas uma rota.

### Room Finder

Retorna uma lista de detalhes de quartos disponíveis do período informado

```
POST /buscar
```

**Parameters**

| Name  | Type | Description                    |
|--------|------|:-------------------------------|
| `checkin` | `string` |Data de entrada (ex: 01/02/2021). |
| `checkout` | `string` |Data de saída (ex: 03/02/2021). |

**Response**
- SUCCESS
```json
[
  {
    "name": "Nome do quarto",
    "description": "Descrição do quarto",
    "images": ["https://url.da.imagem/"],
    "price": "R$ 760,00"
  }
  ...
]
```
- FAILURE
**404**
```json
error: "Room was not found"
```
**400**
```json
error: "Checkin must be in dd/MM/yyyy format"
```
**400**
```json
error: "Checkout must be in dd/MM/yyyy format"
```
## Overview
---
### 1. Lista de dependências
- [Express](https://expressjs.com/)
- [PlayWright](https://playwright.dev/)
- [ESLint](https://eslint.org/)
- [Husky](https://www.npmjs.com/package/husky)
- [LintStaged](https://www.npmjs.com/package/lint-staged)
- [Jest](https://jestjs.io/)
- [Nodemon](https://nodemon.io/)
- [Typescript](https://www.typescriptlang.org/)

### 2. Arquitetura do projeto
Utilizei arquitetura em camadas, sendo esta aprofundada no livro [Clean Architecture](https://en.wikipedia.org/wiki/Robert_C._Martin). A estrutura do projeto se resume em: 
```bash
├── src/
│   ├── application/   // camada que faz conexao com a domain
│   ├── domain/        // camada de regra de negócio
│   ├── infra/        // camada que integra as bibliotecas do projeto
│   ├── main/        // camada que faz integracao do sistema
│   ├── presentation  // camada que recebe as requisições
│   ├── validation/    // camada de validação 
```
As dependências devem ser sempre de cima para baixo, ou seja, as camadas mais externas dependem das camadas mais internas, e nunca o contrário.
- **DOMAIN**: Camada mais profunda do projeto, onde fica a regra de negócio da aplicação. Ela não tem conhecimento de nenhuma outra camada do projeto.
- **APPLICATION**: Camada que implementa a regra de negócio da camada DOMAIN. Ela só conhece a camada DOMAIN (abaixo dela).
- **PRESENTATION**: Camada responsável por 'apresentar' de modo visual o projeto (no nosso caso, os controllers). Ela é a camada mais externa da arquitetura. Conhece as camadas abaixo dela.
- **INFRA**: Responsável por implementar as bibliotecas do projeto, basicamente ela é responsável por alimentar a camada APPLICATION.
- **MAIN**: Responsável por ligar toda a aplicação, onde fazemos as injeções de dependências e conectamos com alguma biblioteca HTTP (no nosso caso) para executar a API.

Uma imagem do diagrama da arquitetura do projeto:
![diagrama-arquitetura-projeto](https://raw.githubusercontent.com/pedroamaral91/room-finder/master/src/assets/project-concept.png)



