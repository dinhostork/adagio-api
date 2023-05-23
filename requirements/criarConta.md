# Criação de Conta

O backend do sistema deve fornecer recursos de criação de contas para os usuários

## Casos de Sucesso
- Receebe uma requisição do tipo **POST** na rota **/users**
- Valida os dados obrigatórios **name**, **email**, **password**
- Verifica se não existe nenhum usuário cadastrado com este e-mail
- **criptografa a senha** 
- **Cria** um usuário com as informações recebidas
- **retorna 200** com os dados do usuário

## Exceções
- retorna erro **404** se a rota não for encontrada
- retorna erro **400** se os campos **name**, **email**, **password** não forem fornecedidos
- retorna erro **500** caso ocorra algum erro na criação do usuário