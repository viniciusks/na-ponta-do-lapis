# Na Ponta do Lápis

## Descrição

Na Ponta do Lápis é um sistema de gerenciamento financeiro pessoal que ajuda você a controlar suas finanças de maneira simples e eficiente. Com ele, você pode registrar suas receitas e despesas, categorizar transações e gerar relatórios detalhados.

## Funcionalidades

- Registro de receitas e despesas
- Categorias personalizáveis
- Relatórios financeiros
- Gráficos de desempenho
- Exportação de dados

## Instalação

Para instalar o sistema, siga os passos abaixo:

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/na-ponta-do-lapis.git
```

2. Navegue até o diretório do projeto:

```bash
cd na-ponta-do-lapis
```

3. Instale as dependências dos microsserviços serveless:

```bash
cd functions
npm install
```

4. Instale as dependências do cliente frontend:

```bash
cd client
npm install
```

## Uso

Para iniciar o sistema, é necessário seguir os seguintes passos:

1. Inicie os microsserviços serveless:

```bash
cd functions
npm run serve
```

2. Inicie o cliente do frontend:

```bash
cd client
npm run start
```

Acesse o sistema (frontend) através do navegador no endereço `http://localhost:4200`.

O backend são microsserviços serveless, eles rodam como functions dentro da GCP através do Firebase. Para conseguir acessar os logs ou analisar a infraestrutura que está de pé, você acessar através do navegador o seguinte endereço `http://localhost:4000`.

Nesse endereço estão rodando os seguintes emuladores que o Firebase sobe, eles são:

- App Hosting;
- Authentication;
- Firestore;
- Functions;
- Storage;

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça o push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para mais informações, entre em contato pelo email: vinicius.kremer@gmail.com
