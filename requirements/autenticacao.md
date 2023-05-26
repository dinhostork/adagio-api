# Autenticação

O backend do sistema deve fornecer recursos de autenticação dos usuários

## Casos de Sucesso
- Recebe uma requisição do tipo **POST** na rota **/auth**
- Valida os dados obrigatórios **email**, **password**
- Verifica se existe usuário cadastrado com este e-mail
- Verifica se a senha está correta
- **retorna 200** com os dados e o token JWT do usuário

## Exceções
- retorna erro **400** se os campos **email**, **password** não forem fornecedidos
- retorna erro **401** caso a senha esteja incorreta ou o usuário não exista com a mensagem **E-mail ou senha incorretos**
- retorna erro **500** caso ocorra algum erro na criação do usuário