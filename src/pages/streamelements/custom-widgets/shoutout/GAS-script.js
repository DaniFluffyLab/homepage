/** Função acionada quando a API é chamada.
 * @param {'store'|'find'} e.parameter.action - Ação a ser executada pela API
 * @param {string} e.parameter.username - Nome do usuário a executar a ação
 * @param {string} e.parameter.url - URL do usuário a armazenar, obrigatório apenas caso action = store
 */
function doGet(e) {
    switch (e.parameter.action) {
      case 'store':
        store(e.parameter.username, e.parameter.url);
        return ContentService.createTextOutput(JSON.stringify({status: 'stored'}));
      case 'find':
        return ContentService.createTextOutput(find(e.parameter.username));
    }
  }
  
  /** Armazena dados do usuário na memória do GAS.
   * @param {string} username - Nome do usuário a executar a ação
   * @param {string} url - URL do usuário a armazenar
   */
  function store(username, url) {
    PropertiesService.getScriptProperties().setProperty(username, url)
  }
  
  /** Armazena dados do usuário na memória do GAS.
   * @param {string} username - Nome do usuário a executar a ação
   * @param {string} url - URL do usuário a armazenar
   */
  function find(username) {
    let url = null
    while (url == null) {
      Utilities.sleep(3000);
      url = PropertiesService.getScriptProperties().getProperty(username)
    }
    return url
  }