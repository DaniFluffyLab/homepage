# =EXT_NOME(nome_completo)

**Descrição:** Obtém o nome da pessoa, extraindo todos os caracteres anteriores ao primeiro espaço do texto.[^1]

{{#include ../../../../_sysfiles/templates/cafe.md}}

## Versão para uso como função nomeada

**Nome da função:**
```
EXT_NOME
```
**Marcadores de posição de argumentos:**
```
nome_completo
```
**Definição da fórmula:**
```
=EXT.TEXTO(nome_completo;1;LOCALIZAR(" ";nome_completo;1))
```
[^1]: Encontrei essa fórmula no site do [Prof. Alexandre Alcantara](https://alcantara.pro.br/portal/2021/04/17/dica-excel-como-separar-nome-do-sobrenome-no-excel/) e adaptei para funcionar como função customizada no Google Sheets.