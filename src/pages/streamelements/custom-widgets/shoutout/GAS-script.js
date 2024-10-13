/** Função acionada quando a API é chamada.
 * @param {'store'|'find'} e.parameter.action - Ação a ser executada pela API
 * @param {string} e.parameter.username - Nome do usuário a executar a ação
 * @param {string} e.parameter.message - Mensagem a armazenar, obrigatório apenas caso action = store
 */
function doGet(e) {
  switch (e.parameter.action) {                                                     // A depender da ação requisitada, executar
    case 'store':                                                                   // Caso seja para armazenar:
      store(decodeURI(e.parameter.username), decodeURI(e.parameter.message));           // Armazenar URL
      return ContentService.createTextOutput(JSON.stringify({ status: 'stored' }));       // Retornar status de sucesso
    case 'find':                                                                    // Caso seja para encontrar:
      return ContentService.createTextOutput(find(e.parameter.username));               // Retornar URL
  }
}

/** Armazena dados do usuário na memória do GAS.
 * @param {string} username - Nome do usuário a executar a ação
 * @param {string} message - Mensagem a armazenar
 */
function store(username, message) {
  PropertiesService.getScriptProperties().setProperty(username, message)    // Armazena URL nas propriedades
}

/** Obter dados do usuário na memória do GAS.
 * @param {string} username - Nome do usuário a executar a ação
 */
function find(username) {
  let url = null                                                          // Declara variável de URL
  for (let tries = 0; tries < 10; tries++) {                            // Tenta achar o URL 10x  
    Utilities.sleep(3000);                                                  // Espera 3seg
    url = PropertiesService.getScriptProperties().getProperty(username)     // Obtém URL das propriedades
    if (url != null) break;                                                 // Se URL encontrada, sair do loop
  }
  if (url == null) return ""                                              // Se URL não encontrada, retornar vazio
  return url                                                              // Retornar URL
}