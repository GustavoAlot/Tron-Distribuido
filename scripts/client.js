let HOST; // = 'ws://x:3000'; // Endereço do servidor WebSocket
let socket; // = new WebSocket(HOST);
var conexao = false;

function obterEnderecoIP() {
  event.preventDefault()
  var enderecoIP = document.getElementById('ip').value;
  //alert('Endereço IP digitado: ' + enderecoIP);
  HOST = 'ws://' + enderecoIP + ':3000';
  socket = new WebSocket(HOST);
  conexao = true;
  console.log(HOST);
  fio1();

}

function fio1(){

    socket.onopen = (event) => {
      console.log('Conectado ao servidor.');
      // Envie uma mensagem para o servidor quando a conexão estiver aberta
      socket.send('Olá, servidor!');
    };

    //setInterval(mnsg, 10000);
    
    
    socket.onmessage = (event) => {
      const message = event.data;
      console.log(`Mensagem do servidor: ${message}`);
      // Encerre a conexão após receber uma resposta (opcional)
      //socket.close();  ------------
    
      // Seleciona o elemento <nav> pelo seu ID
      var navElement = document.getElementById("message");
      navElement.innerHTML = "Mensagem do server: " + message;
    };
    
    
    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('Conexão fechada de forma limpa.');
      } else {
        console.error('Conexão interrompida abruptamente.');
      }
    };
    
    
    socket.onerror = (error) => {
      console.error(`Erro: ${error.message}`);
    };

}


