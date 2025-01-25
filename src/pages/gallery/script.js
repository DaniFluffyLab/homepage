function fullscreen(htmlElement) {

    // Verifica se elemento que chamou a função está em tela cheia
    let isFullscreen = htmlElement.classList.contains("isFullscreen")

    // Seleciona todos os elementos em tela cheia
    document.querySelectorAll(".isFullscreen").forEach(e => {
        e.style.opacity = "0%";             // Torna-os transparentes
        setTimeout(() => e.remove(), 300)   // Remove-os em 300ms
    })

    // Se elemento não está em tela cheia
    if (!isFullscreen) {
        let fsElement = htmlElement.cloneNode(true)         // Clonar elemento
        fsElement.classList.add("isFullscreen")             // Adicionar classe de tela cheia
        htmlElement.parentElement.append(fsElement)         // Inserir no corpo do documento
        setTimeout(() => fsElement.style.opacity = "100%")  // Torna-os opacos
    }

}

window.addEventListener("load", () => {
    document.querySelectorAll(".content main>p").forEach( p => {
        p.setAttribute("onclick", `fullscreen(this)`)
    })
})