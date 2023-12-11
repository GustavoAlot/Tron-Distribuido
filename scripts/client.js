//============================================================
// SCRIPT PARA SABER QUAL IMAGEM CARREGAR NA TELA

const img = document.getElementById("imgGame");
document.getElementById("game").style.display = "none";

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
let numCliente;


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

      playGame(message);

      if(`${message}`.split(" ")[0] == "Pos:"){
        atualizaRival(message);
      }
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


// verifica se recebeu a mensagem sinalizando inicio. Se recebeu, limpa os elemenos da tela
function playGame(mensagem)
{
  if(`${mensagem}`.split(" ")[0] == 'Bora'){

    numCliente = `${mensagem}`.split(" ")[2]; //
    console.log(numCliente);

    document.getElementById("conexao").style.display = "none";
    document.getElementById("game").style.display = "block";
    if(origem == "1"){
      carregarPong();
      document.getElementById("instrucao").innerHTML = "Controle o player usando as teclas W S";
    }
    if(origem == "2"){
      setNumPlayer(numCliente);
      carregarTron();
      //setInterval(envia, 25);
      document.getElementById("instrucao").innerHTML = "Controle o player usando as teclas W A S D";
    }
  }
}

function enviaPos(){
  //let msg = yPlay + " " + yAi;
  socket.send('tron ' + getPosition());
}



