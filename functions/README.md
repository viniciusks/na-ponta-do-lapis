# Na Ponta do Lápis - Firebase Functions

Este projeto contém funções Firebase para a aplicação "Na Ponta do Lápis". As funções são implementadas usando o Firebase Functions, Firestore e Express.js para criar APIs RESTful.

## Estrutura do Projeto

- `index.js`: Arquivo principal que inicializa o Firebase Admin SDK e exporta as APIs.
- `apis/users/index.js`: API para gerenciar usuários.
- `apis/assets/index.js`: API para gerenciar ativos.
- `apis/categories/index.js`: API para gerenciar categorias.

## Configuração

1. **Instalar Dependências**:

   ```bash
   npm install
   ```

2. Configurar Firebase Admin SDK:
   Coloque o arquivo de chave de serviço do Firebase Admin SDK (`javitech.json`) no diretório `service-account`.
