# Criação de publicações (Backend)

O backend do sistema deve permitir que um usuário faça publicação com fotos, textos e vídeos

## Casos de Sucesso
- Recebe uma requisição do tipo **POST** na rota **/posts**
- Valida os dados obrigatórios **text**, **privacy**
- caso haja o campo **files**, valida este campo 
- **Cria** o post com a flag **published = false**
- Faz Upload dos arquivos para **servidor externo**
- Vincula os arquivos ao post
- Define a flag **published** como **true**
- **retorna 200** com o post criado

## Exceções
- retorna erro **400** se os campos **text**, **privacy** não forem fornececidos
- retorna erro **500** caso ocorra algum erro no servidor
