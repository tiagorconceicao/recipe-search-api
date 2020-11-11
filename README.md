# Recipe Search API

Esta API retorna uma lista de receitas a partir de uma lista de ingredientes.

Atualmente são utilizados os dados das APIs públicas [Recipe Puppy][ref1] e [GIPHY][ref2] na construção dos dados que precisam ser retornados.

[ref1]: <http://www.recipepuppy.com/about/api/>
[ref2]: <https://developers.giphy.com/docs/>

A estrutura deste projeto utiliza algúns princípios SOLID, facilitando a futura adição e substituição de funcionalidades e integrações.

## Tecnologias utilizadas

- Typescript
- Node.js
- Docker

## Requisitos

- Node.js
- Yarn
- Docker
- Docker Compose

## Endpoint

A API possui apenas um endpoint, onde devem ser informados os parâmetros da busca (ingredientes) e deve seguir o formato:

`http://{HOST}/recipes/?i={ingredient_1},{ingredient_2},{ingredient_2}`

Podem ser passados até 3 parâmetros separados por vírgula. Caso a chamada exceda esse número os parâmetros excedentes são ignorados.

Caso não seja informado nenhum parâmetro de busca será retornada uma mensagem de erro com `HTTP STATUS: 400`

Exemplo de chamada:

`http://localhost/recipes/?i=garlic,bread,butter`

A resposta de cada requisição segue o seguinte formato:

``` json
{
  "keywords": [
    "garlic",
    "bread",
    "butter"
  ],
  "recipes": [
    {
      "title": "Easy No Salt Garlic Croutons",
      "ingredients": [
        "bread",
        "butter",
        "garlic",
        "olive oil"
      ],
      "link": "http://www.recipezaar.com/Easy-No-Salt-Garlic-Croutons-344616",
      "gif": "https://media.giphy.com/media/elJHvNLVP4lplJToRF/giphy.gif"
    },
    {
      "title": "Simplest Garlic Bread",
      "ingredients": [
        "bread",
        "butter",
        "garlic",
        "parsley"
      ],
      "link": "http://www.recipezaar.com/Simplest-Garlic-Bread-347333",
      "gif": "https://media.giphy.com/media/Q4PcMC8apFXBm/giphy.gif"
    }
  ]
}
```

Em caso de erro, será retornada uma resposta com o seguinte formato:

``` json
{
  "status": "error",
  "message": "string"
}
```

---
---

## Instalação

Antes de realizar a instalação será necessário clonar utilizando o comando:

```sh
git clone https://github.com/tiagorconceicao/recipe-search-api
```

### Variáveis de ambiente

As variáveis de ambiente já estão pré-configuradas com valores padrão, porém é recomendado que a chave da API do GIPHY (GIPHY_API_KEY) seja alterada para evitar possíveis erros por limite de consultas excedido.

É possível configurar as seguintes variáveis:

- **GIPHY_API_KEY**: determina a chave da API do GIPHY. Caso não seja informada uma nova chave a aplicação utilizará uma chave pública. **Não é recomendado o uso da chave pública**, já que frequentemente as consultas retornarão `HTTP STATUS 429`, indicando que o limite de consultas foi excedido.

- **DOCKER_PORT**: determina a porta do container que ficará exposta [padrão = 80]

- **SERVER_PORT**: determina a porta utilizada pelo servidor dentro do container ou em ambiente de desenvolvimento [padrão = 3333]

---

## Executando a aplicação

É possível executar a aplicação tanto localmente como em um Docker Container. Abaixo estão as instruções para executar ambos os modos.

### Docker Container

Para executar a aplicação dentro de um Docker Container basta ir na pasta raiz do repositório e digitar o comando:

```sh
docker-compose up

# utilizando a flag --build é possível forçar o docker a reconstruir o container caso sejam feitas alterações na aplicação
docker-compose up --build
```

A porta do container será a indicada no **DOCKER_PORT** do arquivo **.env** .

### Ambiente de desenvolvimento

Para executar a aplicação em ambiente de desenvolvimento será necessário instalar as dependências localmente usando o comando na pasta do repositório:

```sh
yarn
```

Após finalizada a instalação é possível inicializar o servidor com o comando:

```sh
yarn dev:server
```

A porta do servidor será a indicada no **SERVER_PORT** do arquivo **.env** .

---

## Testes

É possível executar os testes com o comando:

```sh
yarn test
```

*Atenção: os testes de integração podem falhar caso as API externas não estejam disponíveis ou excedam o limite de requisições da chave (GIPHY_API_KEY)*
