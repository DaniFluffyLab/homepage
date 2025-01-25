const TRANSICAO_TEMPO = 300
const IMAGEM_ALTURA = 350
const IMAGEM_ALTURA_HOVER = 20

/** Coloca ou tira imagem da tela cheia */
function fullscreen(htmlElement) {

    // Verifica se elemento que chamou a função está em tela cheia
    let isFullscreen = htmlElement.classList.contains("isFullscreen")

    // Seleciona todos os elementos em tela cheia
    document.querySelectorAll(".isFullscreen").forEach(e => {
        e.style.opacity = "0%";                         // Torna-os transparentes
        setTimeout(() => e.remove(), TRANSICAO_TEMPO)   // Remove-os em 300ms
    })

    // Se elemento não está em tela cheia
    if (!isFullscreen) {

        let fsElement = htmlElement.cloneNode(true)     // Clona elemento
        fsElement.classList.add("isFullscreen")         // Adiciona classe de tela cheia
        fsElement.setAttribute("style", "")

        let close = document.createElement("div")   // Cria botão de fechar
        close.classList.add("close")                // Adiciona classe de fechar ao botão
        close.textContent = "×"                     // Adiciona X ao botão de fechar

        close.addEventListener("click", () => fullscreen(fsElement))    // Adiciona evento para fechar janela
        fsElement.append(close)                                         // Insere botão de fechar no elemento
        htmlElement.parentElement.append(fsElement)                     // Inserir elemento no corpo do documento
        setTimeout(() => fsElement.style.opacity = "100%")              // Torna-os opacos
    }

}
// Configura elementos de containeres
window.addEventListener("load", () => {                             // Assim que janela carregar:
    document.querySelectorAll(".content main>p").forEach( p => {    // Para cada container:

        let image = p.querySelector("img")                                              // Encontra imagem no container
        if (image != null) p.style.width = `${image.width + IMAGEM_ALTURA_HOVER}px`     // Define largura fixa do container

        p.addEventListener("click", () => fullscreen(p))    // Cria evento para colocar imgs em tela cheia
    })
})