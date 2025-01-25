# =QRCODE(link)

**Descrição:** Insere um QRCode do link informado na célula. Baseado nesta API: [https://goqr.me/api/](https://goqr.me/api/)

{{#include ../../_sysfiles/templates/cafe.md}}

## Versão para uso como função nomeada

**Nome da função:**
```
QRCODE
```

**Marcadores de posição de argumentos::**
```
link
```

**Definição da fórmula:**
```
=IMAGE("https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data="&ENCODEURL(link))
```