# =CPFCHECK(cpf)

**Descrição:** Valida o CPF, calculando e verificando os dois dígitos verificadores. O método de verificação é baseado nesse artigo: [Só Matemática -Cálculo do dígito verificador do CPF](https://www.somatematica.com.br/faq/cpf.php)

{{#include ../../_sysfiles/templates/cafe.md}}

<div class="note"><b>Nota da autora</b>

Não consegui usar essa fórmula junto da _[ArrayFormula](https://support.google.com/docs/answer/3093275?hl=pt-BR)_, preciso ainda descobrir o porquê.
Para usar em _ArrayFormula_, utilize a [versão de Apps Script](#versão-para-uso-no-google-apps-script). 
</div>

## Versão para uso como função nomeada

**Nome da função:**
```
CPFCHECK
```
**Marcadores de posição de argumentos:**
```
cpf
```

**Definição da fórmula:**
```
=SE(
    ÉNÚM(VALOR(TEXTO(cpf;"00000000000")));SE(
        NÚM.CARACT(TEXTO(cpf;"00000000000"))=11;SE(
            OU(
                TEXTO(cpf;"00000000000")="00000000000";
                TEXTO(cpf;"00000000000")="11111111111";
                TEXTO(cpf;"00000000000")="22222222222";
                TEXTO(cpf;"00000000000")="33333333333";
                TEXTO(cpf;"00000000000")="44444444444";
                TEXTO(cpf;"00000000000")="55555555555";
                TEXTO(cpf;"00000000000")="66666666666";
                TEXTO(cpf;"00000000000")="77777777777";
                TEXTO(cpf;"00000000000")="88888888888";
                TEXTO(cpf;"00000000000")="99999999999"
            )=FALSO;SE(
                DIREITA(
                    MOD((SOMA(
                        (EXT.TEXTO(TEXTO(cpf;"00000000000");1;1)*10);
                        (EXT.TEXTO(TEXTO(cpf;"00000000000");2;1)*9);
                        (EXT.TEXTO(TEXTO(cpf;"00000000000");3;1)*8);
                        (EXT.TEXTO(TEXTO(cpf;"00000000000");4;1)*7);
                        (EXT.TEXTO(TEXTO(cpf;"00000000000");5;1)*6);
                        (EXT.TEXTO(TEXTO(cpf;"00000000000");6;1)*5);
                        (EXT.TEXTO(TEXTO(cpf;"00000000000");7;1)*4);
                        (EXT.TEXTO(TEXTO(cpf;"00000000000");8;1)*3);
                        (EXT.TEXTO(TEXTO(cpf;"00000000000");9;1)*2);;
                    )*10);11);1)=(EXT.TEXTO(TEXTO(cpf;"00000000000");10;1));SE(
                    DIREITA(
                        MOD((SOMA(
                            (EXT.TEXTO(TEXTO(cpf;"00000000000");1;1)*11);
                            (EXT.TEXTO(TEXTO(cpf;"00000000000");2;1)*10);
                            (EXT.TEXTO(TEXTO(cpf;"00000000000");3;1)*9);
                            (EXT.TEXTO(TEXTO(cpf;"00000000000");4;1)*8);
                            (EXT.TEXTO(TEXTO(cpf;"00000000000");5;1)*7);
                            (EXT.TEXTO(TEXTO(cpf;"00000000000");6;1)*6);
                            (EXT.TEXTO(TEXTO(cpf;"00000000000");7;1)*5);
                            (EXT.TEXTO(TEXTO(cpf;"00000000000");8;1)*4);
                            (EXT.TEXTO(TEXTO(cpf;"00000000000");9;1)*3);
                            (EXT.TEXTO(TEXTO(cpf;"00000000000");10;1)*2);
                        )*10);11);1)=(EXT.TEXTO(TEXTO(cpf;"00000000000");11;1));
                        VERDADEIRO;
                    FALSO);
                FALSO);
            FALSO);
        FALSO);
    FALSO
)
```

## Versão para uso no Google Apps Script

```javascript
/**
 *  Valida o CPF, verificando os dois dígitos verificadores.
 *  O CPF deve ser formatado como texto e não ter ponto ou traço.
 *  
 *  Função por: https://github.com/DaniFluffyLab
 *
 * @param {string} cpf
 * @returns {boolean}
 * @customfunction
 */

function cpfcheck(cpf) {

    // Se for dado único, executar função
    if (!Array.isArray(cpf)) return cpfcheck_(cpf)

    // Se array, separar dados e executar função 
    let arrayValue = cpf
    let arrayReturn = []
    arrayValue.forEach((row) => {
        let rowReturn = []
        row.forEach((cell) => {
            rowReturn.push(

                // Fórmula a calcular
                cpfcheck_(cell)

            )
        })
        arrayReturn.push(rowReturn)
    })
    return arrayReturn


    // Função a executar
    function cpfcheck_(cpf) { // Verifica se CPF existe
      
        // Verificar se possui outros caracteres
        if (cpf.length != 11) return false;
      
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length != 11 ||
          cpf == "00000000000" ||
          cpf == "11111111111" ||
          cpf == "22222222222" ||
          cpf == "33333333333" ||
          cpf == "44444444444" ||
          cpf == "55555555555" ||
          cpf == "66666666666" ||
          cpf == "77777777777" ||
          cpf == "88888888888" ||
          cpf == "99999999999") return false;
      
        // Valida 1o digito	
        add = 0;
        for (i = 0; i < 9; i++)
          add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
          rev = 0;
        if (rev != parseInt(cpf.charAt(9))) return false;
      
        // Valida 2o digito	
        add = 0;
        for (i = 0; i < 10; i++)
          add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
          rev = 0;
        if (rev != parseInt(cpf.charAt(10))) return false;
      
        return true;
      }

}
```


{{#include ../../_sysfiles/templates/cafe.md}}
