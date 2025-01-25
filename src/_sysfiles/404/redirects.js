/** Este arquivo contém um conjunto de regras para tentar resolver erros comuns de URL antes de exibir o 404 pro usuário */
function main() {

    // Obtém a URL original
    let url = window.location.href

    // REGRA - Se a página não termina em main.html
    if (!/main\.html$/.test(url)) {
        let replaceUrl = url + "/main.html"                                 // Adiciona main.html
        replaceUrl = replaceUrl.replaceAll("//main.html", "/main.html")     // Checa se ficou dupla barra
        window.location.replace(replaceUrl)                                 // Redireciona
        return                                                              // Encerra execução
    }

    // REGRA - Se página do antigo projeto de fórmulas do Google Sheets
    if (/\/pages\/google\/formulas\//.test(url)) {
        console.log("teste")
        let replaceUrl = url.replace("/pages/google/formulas/", "/gsheets-formulas/")   // Atualiza referência
        window.location.replace(replaceUrl)                                             // Redireciona
        return                                                                          // Encerra execução
    }

    // REGRA - Se página do antigo projeto de widgets do StreamElements
    if (/\/pages\/se\/widgets\//.test(url)) {
        let replaceUrl = url.replace("/pages/se/widgets/", "/se-tools/")        // Atualiza referência
        window.location.replace(replaceUrl)                                     // Redireciona
        return                                                                  // Encerra execução
    }

    // REGRA - Se a página era hospedada anteriormente em danifluffy.dev/pages
    if (/danifluffy\.dev\/pages\//.test(url)) {
        let replaceUrl = url.replace("danifluffy.dev/pages/", "danifluffy.dev/")    // Remove referência
        window.location.replace(replaceUrl)                                         // Redireciona
        return                                                                      // Encerra execução
    }

    // Exibe a mensagem de Erro 404
    window.addEventListener("load", () =>
        document.querySelector(".erro-404").classList.remove("erro-404")
    )
}

main();     //Executa script