Este é um projeto [Next.js](https://nextjs.org/)
Foi construido utilizando as tecnologias: NextJs, React, Typescript, Jest, Sass, Babel e HTML/CSS. Está rodando com a versão 20.13.1 do Node por ser um requisito para o Next 14.

## Primeiros passos

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

Automaticamente será redirecionado para a rota /characters

## Observação

Foi construido uma api BFF utilizando o Next Api pois a api da márvel está com instabilidades, os dados são dados reais da api e foi buscado utilizando o seguinte script:

```javascript
const getAllChar = async (times, qty, initial) => {
    let arr = []
    const getItems = async (offset, limit) => {
      const data = await fetch(
        `https://gateway.marvel.com/v1/public/characters?apikey='SUA-API'&hash='SUA-HASH'&ts=001&offset=${offset}&limit=${limit}`,
        {
          method: 'GET'
        }
      )

      return data.json()
    }

    let start = initial
    let end = start + qty

    for (let i = 0; i < times; i++) {

      const [result] = await Promise.allSettled([getItems(start, qty)])

    if (result.value.data.results) {
        console.log(start ${start} - end ${end})
        console.log(result.value.data.results)
        arr.push(result.value.data.results)
      }

      start = start + qty
      end = end + qty
    }

    return arr
  }
```

Para ter mais dados, rode o script com os parametros necessários e atualize o arquivo chars.json em /src/mocks/chars.json
