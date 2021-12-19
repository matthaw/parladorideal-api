<h1 align="center">Parlador Ideal API</h1>

<p align="center">Esse é um API para servir ao app Parlador Ideal.</p>

---

<br>


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [NodeJS](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/cli/install)

#### Clone este repositório
```bash
$ git clone https://github.com/matthaw/parladorideal-api.git
```

#### Acesse a pasta do projeto no terminal/cmd

```bash
$ cd parladorideal-api
```

#### Faça uma cópia de '.env.example' para '.env'
#### É configure suas variáveis.

```bash
$ cp .env.example .env

# Variáveis

PORT=3000
JWT_SECRET=your_password
JWT_EXPIRES_IN=time ex: 1d, 7d, 1m
```

#### Instale as dependências
```bash
$ yarn
```

#### Para criar as tabelas do banco de dados, basta executar as migrations

```bash
$ yarn typeorm migration:run
```

#### Caso queira já popular o banco de dados com alguns usuário e posts:

```bash
$ DEVELOPMENT_ENV=true yarn seed:run
```

#### Agora, para você iniciar a aplicação, basta executar

```bash
$ yarn start
```

#### Caso queira executar em modo de desenvolvimento, execute o seguinte comando passando a variável DEVELOPMENT_ENV=true indicando que a aplicação está em modo de desenvolvimento.

```bash
$ DEVELOPMENT_ENV=true yarn dev
```

### Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/)
- [Typeorm](https://typeorm.io/#/)
- [SQLITE](https://www.sqlite.org/index.html)
