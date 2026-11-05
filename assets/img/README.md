# Capturas de tela do aplicativo

A página inicial tem seis espaços para capturas. **Prontos (capturas reais, conta de demonstração com dados fictícios, 04/11/2026):** `captura-home`, `captura-lancamento` (lista de lançamentos), `captura-fatura`, `captura-importacao` (revisão de extrato OFX) e `captura-relatorios`, em WebP 540/1080 px. **Ainda reservado:** `captura-familia`. A página tem seis espaços (`<figure class="shot" data-placeholder="...">`). Cada um
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

## Checklist de publicação (landing)

Pendências que dependem do aplicativo ou da Google Play (registradas em 04/11/2026):

1. **Ficha da Google Play.** A URL `https://play.google.com/store/apps/details?id=com.zavena.finance` respondia 404 (aplicativo ainda não publicado). Ela aparece em 3 botões (cabeçalho, primeira dobra e convite final). Não publicar o site antes de a ficha estar pública; depois, abrir a URL num navegador e conferir.
2. **Dados estruturados.** Quando a ficha existir, acrescentar `SoftwareApplication` ao JSON-LD. A chave `addressLocality` foi removida por estar vazia; só voltar com a cidade confirmada para publicação.
3. **Recapturas após o deploy das correções do app** (as imagens atuais são reais, mas anteriores às correções): importação (datas do OFX), lançamentos (transferência neutra e sinal dos empréstimos) e família (avatar "L" da conta Google; bloco aguardando decisão de produto). Substituir pelos novos arquivos com os mesmos nomes (`captura-*-540.webp` e `-1080.webp`).
4. **Premium: leitor de notificações e exportação.** Estão como Premium no código, mas a disponibilidade na versão publicada não pôde ser confirmada; por isso não foram anunciados. Incluir nos planos quando confirmado.
5. **Premium: relatórios.** A tela de Relatórios exibe paywall sem o recurso `advanced_reports` (RelatoriosScreen.tsx); o texto do plano permanece "Acesso aos relatórios".
6. **iOS "em breve".** Sem data nem build confirmados; manter o selo sem prazo.
