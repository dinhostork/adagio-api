# Backend - Curtidas em Posts

o Backend do sistema deve permitir a curtida de posts

# Casos de Sucesso
- Recebe uma requisição do tipo Post na rota **/likes/:postId**
- Verifica se o post existe
- Verifica se já existe uma curtida do usuário no post
- Retorna **201** com os dados da curtida
- Caso o usuário já tenha curtido o post apaga a curtida do usuário e retorna o código **204**

# Exceções
- Retorna erro **404** caso o post não exista
