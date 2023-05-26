# Backend: Middleware de Autenticação

O backend do sistema deve reconhecer os usuários através do token

## Casos de Sucesso
- Recebe uma requisição para uma rota protegida com o **authorization no cabeçalho**
- Valida se o campo authorization está presente na requisição e é válido
- exporta o id na requisição
- prossegue com a requisição

## Exceções
- retorna erro **400** se o campo **authorization**, não for fornecido no cabeçalho ou não for válido