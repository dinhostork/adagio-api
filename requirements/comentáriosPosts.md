# Backend - Comentários em Posts

o Backend do sistema deve permitir a criação, listagem, atualização e exclusão de comentários nos posts

# Casos de Sucesso (Criação)
- Recebe uma requisição do tipo Post na rota **/comments/:postId**
- Verifica se o post existe
- Retorna **200** com os comentário publicado

# Casos de Sucesso (Editar)
- Recebe uma requisição do tipo put na rota **/comments/:commentId**
- Verifica se o comentário existe
- Verifica se o usuário que está tentando editar é o mesmo que criou o comentário
- Atualiza o comentário
- Retorna **200** com os comentário atualizado

# Casos de Sucesso (Listar)
- Recebe uma requisição do tipo get na rota **/comments/:postId?page=1**
- Verifica se o post existe
- Retorna **200** com os comentários páginados


# Exceções
- Retorna erro **404** caso o post não exista
- Retorna erro **404** caso o comentário não exista
- Retorna erro **403** caso o usuário não seja o criador do comentário
