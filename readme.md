# 🎼 Adagio (Backend)

Este é o repositório do Backend do projeto Adagio, uma rede social voltada para músicos.

---
## 👀 Visão Geral

O Adagio é uma plataforma social que visa conectar músicos e entusiastas da música, fornecendo recursos para compartilhar experiências, criar eventos, formar bandas, realizar Jam sessions e muito mais. Esta API é desenvolvida em TypeScript e utiliza diversas tecnologias populares, como Jest, Sequelize, MySQL e Celebrate.
---

# ⚙️ Tecnologias Utilizadas

    TypeScript
    Jest
    Sequelize
    MySQL
    Celebrate
    Multer
---
# 🧪 Desenvolvimento Orientado a Testes (TDD)

Este projeto segue a metodologia de Desenvolvimento Orientado a Testes (TDD), onde os testes são escritos antes da implementação do código. Os testes garantem a qualidade e a integridade do código, além de servirem como documentação do comportamento esperado.
---
# 🤝 Contribuição

Os contribuidores são bem-vindos para melhorar e expandir este projeto. Se você deseja contribuir, siga estas etapas:

- Faça um fork do repositório.
- Crie um branch para a sua feature ou correção de bug: git checkout -b nome-da-sua-branch.
- Desenvolva e teste suas alterações.
- Faça commit das suas alterações: git commit -m "Descrição das alterações".
- Envie suas alterações para o seu fork: git push origin nome-da-sua-branch.
- Abra um Pull Request para a branch develop deste repositório.
- Aguarde a análise e discussão do seu Pull Request.
- Após a revisão, seu Pull Request será mergeado na branch master.
---
# ⚙️ Configuração do Ambiente

Antes de executar a API, é necessário configurar as variáveis de ambiente. Renomeie o arquivo .env.example para .env e preencha as variáveis de acordo com a sua configuração:
```
APPLICATION_PORT=3333
API_VERSION=1
API_URL="localhost"
DB_NAME=
DB_USER=
DB_HOST=
DB_DRIVER=
DB_PASSWORD=
DB_TEST_STORAGE=
DB_TEST_DRIVER=
NODE_ENV=
JWT_SECRET=
```
---

# 🚀 Executando a API

Siga estas etapas para executar a API em ambiente de desenvolvimento:

- Instale as dependências do projeto: npm install.
- Execute as migrações do banco de dados: npm run migrate.
- Execute as seeds do banco de dados: npm run seed.
- Inicie o servidor de desenvolvimento: npm run start:dev.
- Acesse a API em: http://localhost:3333.
