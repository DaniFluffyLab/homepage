
/** Mostra o alerta */
function showAlert(username, audioname) {

    let alertHTML = document.querySelector(`#alert_container`)
    let audioHTML = document.querySelector(`#audio-${audioname}`)
    let usernameHTML = document.querySelector(`#username`)
    let audionameHTML = document.querySelector(`#audioname`)
    let alert_textHTML = document.querySelector(`#alert_text`)

    if (!timeout.run(username)) return              // Caso timeout não expirado, ignorar
    if (audioHTML.dataset.active != "true") return  // Caso audio inativo, ignorar

    usernameHTML.textContent = username             // Definir nome de usuário
    audionameHTML.textContent = audioname           // Definir nome do áudio
    audioHTML.play()                                // Tocar audio    
    SE_API.sendMessage(alert_textHTML.textContent)  // Enviar mensagem no chat

    alertHTML.dataset.show = true                   // Exibir overlay
    setTimeout(() =>
        alertHTML.dataset.show = false,             // Oculta overlay
        alertHTML.dataset.fade * 1000               // Aguarda xx segundos para isso
    )
}

/** Gerencia os timeouts*/
let timeout = {
    globalTimeout: 0,
    userTimeout: 0,
    userData: {},
    lastRun: new Date().getTime(),
    run: function (username) {
        if ((new Date().getTime()) < this.lastRun) return false               // Caso timeout global não tenha expirado, retornar false
        if ((new Date().getTime()) < this.userData[username]) return false    // Caso timeout de user não tenha expirado, retornar false

        this.lastRun = (new Date().getTime()) + this.globalTimeout * 1000           // Atualiza última execução
        this.userData[username] = (new Date().getTime()) + this.userTimeout * 1000  // Atualiza última execução do usuário
        return true
    }
}

// Executar assim que iniciar
window.onload = () => {

    let alertHTML = document.querySelector(`#alert_container`)
    let alert_textHTML = document.querySelector(`#alert_text`)

    // Insere os elementos de texto na descrição do alerta
    alert_textHTML.innerHTML = alert_textHTML.dataset.value
        .replaceAll("{username}", '<span id="username">USER</span>')
        .replaceAll("{audioname}", '<span id="audioname">AUDIO</span>')

    // Define o timeout global no objeto de timeout
    timeout.globalTimeout = parseInt(alertHTML.dataset.fade) + parseInt(alertHTML.dataset.globaltimeout)
    timeout.userTimeout = parseInt(alertHTML.dataset.fade) + parseInt(alertHTML.dataset.usertimeout)

    // Aguardar 5seg antes de disparar alertas
    setTimeout(() => await_start = false, 5000)
}

let await_start = true

// Executar quando receber uma mensagem
window.addEventListener('onEventReceived', function (obj) {

    if (await_start) return                                             // Caso esteja aguardando ligar, ignorar
    if (obj.detail.listener != "message") return                        // Caso não seja mensagem, ignorar
    let message = obj.detail.event.data.text                            // Armazena mensagem
    let nick = obj.detail.event.data.nick                               // Armazena nick
    if (message.indexOf("!") == -1) return                              // Caso não seja comando, ignorar
    message = message.replaceAll("!", "")                                // Remove símbolo de comando
    if (document.querySelector(`#audio-${message}`) == null) return     // Caso audio não exista, ignorar
    showAlert(nick, message)                                            // Executar alerta

});

