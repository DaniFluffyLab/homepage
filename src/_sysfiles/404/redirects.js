/* Este arquivo contém um conjunto de regras para tentar resolver erros comuns de URL antes de exibir o 404 pro usuário */

// Obtém a URL original
let url = window.location.href

// REGRA - Se a página não termina em main.html
if (!/main\.html$/.test(url)) {
    let replaceUrl = url + "/main.html"                                 // Adiciona main.html
    replaceUrl = replaceUrl.replaceAll("//main.html", "/main.html")     // Checa se ficou dupla barra
    window.location.replace(replaceUrl)                                 // Redireciona
}

// REGRA - Se a página era hospedada em danifluffy.dev/pages
if (/danifluffy\.dev\/pages\//.test(url)) {
    let replaceUrl = url.replace("danifluffy.dev/pages/", "danifluffy.dev/")    // Remove referência
    window.location.replace(replaceUrl)                                         // Redireciona
}

// Exibe a mensagem de Erro 404
window.addEventListener("load", () => 
    document.querySelector(".erro-404").classList.remove("erro-404")
)