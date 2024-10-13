// Executar assim que iniciar

let await_start = true
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
    setTimeout(() => {
        await_start = false;
        console.log("Soundboard inicializado.")
    }, 5000)
}



// Guarda os comandos dos áudios

let audioCmds = {
    audio01: "{{audio01_name}}", 
    audio02: "{{audio02_name}}",
    audio03: "{{audio03_name}}",
    audio04: "{{audio04_name}}",
    audio05: "{{audio05_name}}",
    audio06: "{{audio06_name}}",
    audio07: "{{audio07_name}}",
    audio08: "{{audio08_name}}",
    audio09: "{{audio09_name}}",
    audio10: "{{audio10_name}}",
    audio11: "{{audio11_name}}",
    audio12: "{{audio12_name}}",
    audio13: "{{audio13_name}}",
    audio14: "{{audio14_name}}",
    audio15: "{{audio15_name}}",
    audio16: "{{audio16_name}}",
    audio17: "{{audio17_name}}",
    audio18: "{{audio18_name}}",
    audio19: "{{audio19_name}}",
    audio20: "{{audio20_name}}",
    audio21: "{{audio21_name}}",
    audio22: "{{audio22_name}}",
    audio23: "{{audio23_name}}",
    audio24: "{{audio24_name}}",
    audio25: "{{audio25_name}}",
    audio26: "{{audio26_name}}",
    audio27: "{{audio27_name}}",
    audio28: "{{audio28_name}}",
    audio29: "{{audio29_name}}",
    audio30: "{{audio30_name}}",
    audio31: "{{audio31_name}}",
    audio32: "{{audio32_name}}",
    audio33: "{{audio33_name}}",
    audio34: "{{audio34_name}}",
    audio35: "{{audio35_name}}",
    audio36: "{{audio36_name}}",
    audio37: "{{audio37_name}}",
    audio38: "{{audio38_name}}",
    audio39: "{{audio39_name}}",
    audio40: "{{audio40_name}}",
    audio41: "{{audio41_name}}",
    audio42: "{{audio42_name}}",
    audio43: "{{audio43_name}}",
    audio44: "{{audio44_name}}",
    audio45: "{{audio45_name}}",
    audio46: "{{audio46_name}}",
    audio47: "{{audio47_name}}",
    audio48: "{{audio48_name}}",
    audio49: "{{audio49_name}}",
    audio50: "{{audio50_name}}"
}



// Executar quando receber um evento

window.addEventListener('onEventReceived', function (obj) {

    if (await_start) return     // Caso esteja aguardando ligar, ignorar

    // Executa uma ação baseada em um evento
    switch (obj.detail.event.listener) {

        case "message":
            let message = obj.detail.event.data.text                            // Armazena mensagem
            let nick = obj.detail.event.data.nick                               // Armazena nick
            if (message.indexOf("!") == -1) return                              // Caso não seja comando, ignorar
            message = message.replaceAll("!", "")                               // Remove símbolo de comando
            if (document.querySelector(`#audio-${message}`) == null) return     // Caso audio não exista, ignorar
            showAlert(nick, message)                                            // Exibir alerta
            return;

        case "widget-button":
            showAlert("DaniFluffyTesty", audioCmds[obj.detail.event.value], true)   // Executa alerta de teste
            return;
    }
});



/** Mostra o alerta */

function showAlert(username, audioname, isTest) {

    let alertHTML = document.querySelector(`#alert_container`)
    let audioHTML = document.querySelector(`#audio-${audioname}`)
    let usernameHTML = document.querySelector(`#username`)
    let audionameHTML = document.querySelector(`#audioname`)

    if (!timeout.run(username, isTest)) return      // Caso timeout não expirado, ignorar
    if (audioHTML.dataset.active != "true") return  // Caso audio inativo, ignorar

    usernameHTML.textContent = username             // Definir nome de usuário
    audionameHTML.textContent = audioname           // Definir nome do áudio
    audioHTML.play()                                // Tocar audio    

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
    run: function (username, isTest) {
        if (isTest) return true
        if ((new Date().getTime()) < this.lastRun) return false               // Caso timeout global não tenha expirado, retornar false
        if ((new Date().getTime()) < this.userData[username]) return false    // Caso timeout de user não tenha expirado, retornar false

        this.lastRun = (new Date().getTime()) + this.globalTimeout * 1000           // Atualiza última execução
        this.userData[username] = (new Date().getTime()) + this.userTimeout * 1000  // Atualiza última execução do usuário
        return true
    }
}