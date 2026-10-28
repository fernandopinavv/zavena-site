# Capturas de tela do aplicativo (pendentes)

A página inicial tem seis espaços reservados (`<figure class="shot" data-placeholder="...">`). Cada um
deve receber uma **captura real** do aplicativo. Não usar tela simulada, ilustração do produto nem imagem
gerada.

| `data-placeholder` | Tela | Estado necessário |
|---|---|---|
| `captura-home` | Home | Conta de demonstração com cerca de um mês de lançamentos |
| `captura-lancamento` | Novo lançamento | Formulário preenchido (ex.: "Mercado", valor fictício) |
| `captura-fatura` | Fatura do cartão | Fatura aberta com parcelas |
| `captura-importacao` | Importação | Tela de importação com um arquivo OFX sintético |
| `captura-familia` | Família | Duas pessoas fictícias na família (Premium) |
| `captura-relatorios` | Relatórios | Três meses de dados fictícios (Premium) |

Regras: ambiente de teste, nunca produção; nomes e valores fictícios; conferir e-mail, nome, foto de perfil
e barra de notificações; remover metadados. Proporção do aparelho (cerca de 9:19). Entregar em WebP, até
cerca de 120 KB, com versões de 1x e 2x para `srcset`.

## Como trocar o espaço reservado

Dentro do `<figure>`, substituir o `<div class="shot__frame" ...>` por:

```html
<img src="assets/img/captura-home.webp" width="540" height="1140" alt="Descreva o que a tela mostra" loading="lazy">
```

(`loading="eager"` e sem `lazy` na imagem da primeira dobra), ajustar a legenda e remover o atributo
`data-placeholder`. As imagens abaixo da dobra devem ter `width` e `height` para não causar deslocamento.

## Marca (logotipo oficial do aplicativo)

Arquivos gerados a partir dos SVGs oficiais em `mobile/assets/` (`zavena-symbol.svg`, `logo-nome.svg`; o logotipo empilhado dessa última também gerou o `og.png`),
sem redesenho: só recorte da área útil, remoção do retângulo de fundo e do metadado do editor.
Os originais continuam no app; se a identidade mudar, regerar a partir deles.

| Arquivo | Uso |
|---|---|
| `zavena-horizontal.svg` | Cabeçalho (`<img>`) e rodapé (`background` por CSS em `chrome.css`): símbolo + nome lado a lado |
| `zavena-simbolo.svg` | Fita decorativa grande na primeira dobra e no convite final |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Ícones da aba e da tela inicial (mesma composição do favicon do app, sobre `#EFEEEB`) |
| `og.png` | Imagem de compartilhamento 1200×630: logotipo empilhado oficial centrado no bege, sem texto novo |

O `og.png` e os ícones são PNG renderizados dos SVGs oficiais.
