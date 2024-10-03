window.onload = () => {

    // Cria o HTML das imagens
    let imagesURLs = document.body.dataset.imagesurls.split(",")
    imagesURLs.forEach(url => {
        document.body.insertAdjacentHTML("beforeend", `<div class="image" style="background-image: url('${url}');"></div>`)
    })

    // Obtém as variáveis para o loop de imagens
    let interval = parseInt(document.body.dataset.transitioninterval)
    let images = document.querySelectorAll(".image[style*='streamelements.com']")
    let counter = 0

    // Exibe a primeira imagem
    document.querySelector(".image[style*='streamelements.com']").setAttribute('visible', 'true')

    // Cria o loop
    setInterval(() => {
        if (counter == images.length) counter = 0
        images.forEach((e) => e.setAttribute('visible', 'false'))
        images[counter].setAttribute('visible', 'true')
        counter++
    }, interval);

}