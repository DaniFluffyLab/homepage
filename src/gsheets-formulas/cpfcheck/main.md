# =CPFCHECK(cpf)

**Descrição:** Valida o CPF, calculando e verificando os dois dígitos verificadores. O método de verificação é baseado nesse artigo: [Só Matemática -Cálculo do dígito verificador do CPF](https://www.somatematica.com.br/faq/cpf.php). Utilize apenas números para verificar o CPF.

{{#include ../../_sysfiles/templates/cafe.md}}

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
```shell
=BYROW(TEXT(cpf;"00000000000");
    LAMBDA(λ;
        IF(
            ISNUMBER(VALUE(λ));IF(
                LEN(λ)=11;IF(
                    OR(
                        λ="00000000000";
                        λ="11111111111";
                        λ="22222222222";
                        λ="33333333333";
                        λ="44444444444";
                        λ="55555555555";
                        λ="66666666666";
                        λ="77777777777";
                        λ="88888888888";
                        λ="99999999999"
                    )=FALSE;IF(
                        RIGHT(
                            MOD((SUM(
                                (MID(λ;1;1)*10);
                                (MID(λ;2;1)*9);
                                (MID(λ;3;1)*8);
                                (MID(λ;4;1)*7);
                                (MID(λ;5;1)*6);
                                (MID(λ;6;1)*5);
                                (MID(λ;7;1)*4);
                                (MID(λ;8;1)*3);
                                (MID(λ;9;1)*2);;
                            )*10);11);1)=(MID(λ;10;1));IF(
                            RIGHT(
                                MOD((SUM(
                                    (MID(λ;1;1)*11);
                                    (MID(λ;2;1)*10);
                                    (MID(λ;3;1)*9);
                                    (MID(λ;4;1)*8);
                                    (MID(λ;5;1)*7);
                                    (MID(λ;6;1)*6);
                                    (MID(λ;7;1)*5);
                                    (MID(λ;8;1)*4);
                                    (MID(λ;9;1)*3);
                                    (MID(λ;10;1)*2);
                                )*10);11);1)=(MID(λ;11;1));
                                TRUE;
                            FALSE);
                        FALSE);
                    FALSE);
                FALSE);
            FALSE
        )
    )
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
