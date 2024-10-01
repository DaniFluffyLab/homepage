# =EXT_SOBRENOME(nome_completo)

**Descrição:** Obtém o sobrenome da pessoa, extraindo todos os caracteres posteriores ao primeiro espaço do texto.[^1]

## Versão para uso como função nomeada

**Nome da função:**
```
EXT_SOBRENOME
```
**Marcadores de posição de argumentos::**
```
nome_completo
```

**Definição da fórmula:**
```
=EXT.TEXTO(nome_completo;LOCALIZAR(" ";nome_completo;1)+1;NÚM.CARACT(nome_completo))
```
[^1]: Encontrei essa fórmula no site do [Prof. Alexandre Alcantara](https://alcantara.pro.br/portal/2021/04/17/dica-excel-como-separar-nome-do-sobrenome-no-excel/) e adaptei para funcionar como função customizada no Google Sheets.