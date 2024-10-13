// Definição de variáveis
let chatUsers = new Map()                           // Objeto para armazenar os dados de quem fala no chat
let await_start = true                              // Variável para aguardar a inicialização do código
let apiUrl = "{{api_url}}"                          // URL da API do Google Apps Script
let cmdSilent = "!{{cmd_silentCommand}}"            // Comando que chama o shoutout silenciosamente
let cmdAlert = "!{{cmd_alertCommand}}"              // Comando que chama o alerta de shoutout
let cmdText = "{{cmd_text}}"                        // Texto que o comando vai retornar
let cmdPermissionLevel = "{{cmd_permissionLevel}}"  // Nível de permissão para usar o comando



// Executar assim que iniciar
window.onload = () => {

    // Definição de variáveis
    let alert_textHTML = document.querySelector(`#alert_text`)

    // Insere os elementos de texto na descrição do alerta
    alert_textHTML.innerHTML = alert_textHTML.dataset.value
        .replaceAll("{username}", '<span id="username">USER</span>')

    // Aguardar 5seg antes de disparar alertas
    setTimeout(() => {
        await_start = false;
        console.log("Shoutout inicializado.")
    }, 5000)
}



// Executar quando receber um evento
window.addEventListener('onEventReceived', function (obj) {

    if (await_start) return             // Caso esteja aguardando ligar, ignorar
    let data = obj.detail.event.data    // Armazena dados do evento

    // Executa uma ação baseada em um evento
    switch (obj.detail.event.listener) {

        case "message":

            // Definição de variáveis
            let text = data.text                        // Armazena texto da mensagem
            let user = data.authorDetails               // Armazena usuário da mensagem 
            let userAccess = user.isChatOwner ? 2 :     // Usuário é dono do canal?
                user.isChatModerator ? 1 : 0            // Usuário é mod do canal?
            let command = /^![^\s]{0,}/.exec(text)      // Armazena comando
            let userCalled = /(?<=@).*$/.exec(text)     // Armazena usuário marcado

            // Armazena usuário na database interna
            chatUsers.set(user.displayName, { url: user.channelUrl, pict: data.avatar })

            // Se não há comando ou usuário marcado, encerrar execução
            if (command == null || userCalled == null) return

            // Se há um comando do shoutout, enviar usuário para a API
            if (command[0] == cmdAlert || command[0] == cmdSilent) storeInAPI(userCalled)

            // Se o comando de alerta foi chamado e usuário tem permissão, mostrar alerta
            if (command[0] == cmdAlert && userAccess - cmdPermissionLevel >= 0 ) showAlert(userCalled)

            // Encerrar execução
            return;

        case "widget-button":
            showAlert("DaniFluffyTesty")  // Executa alerta de teste
            return;                             // Encerra execução
    }
});



// Envia informações do usuário para API
function storeInAPI(username) {
    
    // Declaração de variáveis
    let user = undefined
    let loopCount = 0

    // Executar loop
    let loop = setInterval(() => {
                            
        if (loopCount < 10) clearInterval(loop)     // Caso mais de 10 loops, encerrar loop
        loopCount++                                 // Acrescenta 1 ao contador do loop

        user = chatUsers.get(username)  // Procura o username
        if (user == undefined) return   // Caso não tenha achado o usuário, partir para próxima tentativa

        // Envia os dados para a API
        let message = cmdText.replaceAll("{username}", username).replaceAll("{url}", user.url)
        fetch(`${apiUrl}?action=store&username=${decodeURI(username)}&message=${decodeURI(message)}`)
        clearInterval(loop)
        
    }, 3000);
}



// Mostra alerta na tela
function showAlert(username) {

    // Declaração de variáveis
    let alertHTML = document.querySelector(`#alert_container`)
    let usernameHTML = document.querySelector(`#username`)

    usernameHTML.textContent = username             // Definir nome de usuário

    alertHTML.dataset.show = true                   // Exibir overlay
    setTimeout(() =>
        alertHTML.dataset.show = false,             // Oculta overlay
        alertHTML.dataset.fade * 1000               // Aguarda xx segundos para isso
    )
}