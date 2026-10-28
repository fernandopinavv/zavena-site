# Fontes do site

Subsets latinos WOFF2, derivados dos arquivos oficiais, sob a SIL Open Font License 1.1. Os arquivos
de licença de cada família estão nesta pasta e devem acompanhar as fontes.

| Arquivo | Família | Bytes | SHA-256 | Licença |
|---|---|---|---|---|
| `Fraunces-latin.woff2` | Fraunces (undercasetype/Fraunces, commit 7ccdec31c6028118dce3e47fe864e3744460371d) | 103956 | 04fb9c895cfcedd269ba631d0eff835f877790d134355acfde53487c513d1ee3 | `Fraunces-OFL.txt` |
| `Inter-latin.woff2` | Inter (rsms/inter, commit 353b61b9f4430d5f420d56605a6e7993e0941470) | 39476 | 9780c6863122ec5dea723e71f15ac162b7ccaaa32e6fe7124e1ab3bb7bc107d6 | `Inter-LICENSE.txt` |

Total: 143432 bytes.

Eixos preservados. Fraunces: `SOFT` 0–100, `WONK` 0–1, `wght` 400–600, `opsz` 20–100. Inter: `wght` 400–700,
`opsz` 14–32. Não usar na Fraunces peso acima de 600 nem fora de 20–100 de tamanho óptico: a fonte
foi recortada a esses limites.

Recursos OpenType: Fraunces `aalt case liga locl rvrn ss01 kern`; Inter `calt case locl pnum tnum zero
cpsp kern`. A Fraunces não tem algarismos tabulares: valores financeiros devem ser compostos em Inter.

Conjunto de caracteres: Basic Latin, Latin-1, travessões, aspas curvas, reticências, marcador, sinal
de menos e outros itens. Texto em NFC. Processo, ferramenta, versões e integridades em
`_dev/fonts/ORIGEM.md`.
