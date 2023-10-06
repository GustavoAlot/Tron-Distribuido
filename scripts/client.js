//============================================================
// SCRIPT PARA SABER QUAL IMAGEM CARREGAR NA TELA

const img = document.getElementById("imgGame");

// Verifica se o parâmetro de consulta "origem" é "pagina1"
const origem = getQueryParam("game");
if (origem === "1") {
  img.src = "../imagens/pong2.png";
}

// Função para obter o valor do parâmetro de consulta "origem"
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

//============================================================

function desaparecer() {
  document.getElementById('conexao').style.display = 'none';
}

//============================================================



let HOST; // = 'ws://x:3000'; // Endereço do servidor WebSocket
let socket; // = new WebSocket(HOST);
var conexao = false;


function obterEnderecoIP(){
  event.preventDefault()
  var enderecoIP = document.getElementById('ip').value;

  HOST = 'ws://' + enderecoIP + ':3000';
  socket = new WebSocket(HOST);
  conexao = true;

  fio1();
}


function fio1()
{

    socket.onopen = (event) => {
      console.log('Conectado ao servidor.');
      // Envie uma mensagem para o servidor quando a conexão estiver aberta
      socket.send('Game' + origem);
    };

    //setInterval(envia, 10);
    
    
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


function envia(){
    let msg = yPlay + " " + yAi;
    socket.send(msg);
}




