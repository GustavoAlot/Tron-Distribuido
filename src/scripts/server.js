const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });
console.log('Servidor WebSocket ouvindo na porta 3000');

// Array para armazenar as conexões dos clientes
const clientes = [];
var gameId;
let jogoStartado = false;

let p1x, p2x, p1y, p2y;
var numeroSalas = 0;


server.on('connection', (ws) => {
  
  let conectado = false; //firula


  // Evento de recebimento de mensagens do cliente
  ws.on('message', (message) => {
    console.log(`Mensagem do cliente: ${message}`);


    // Adcione a conexão do cliente ao array se estiverem no mesmo game
    if( qtdClientesSala(numeroSalas) == 0){
      gameId = `${message}`;
      adicionarAoSubarray(numeroSalas, ws);
      conectado = true;
      console.log('Cliente conectado.');
      ws.send("Sala " + numeroSalas);
      ws.send('Aguardando o numero correto de jogadores para iniciar!');
    }
    else if(message == gameId ){  
      adicionarAoSubarray(numeroSalas, ws);
      conectado = true;
      console.log('Cliente conectado.');
      ws.send("Sala " + numeroSalas);
      ws.send('Ja vai comecar!'); 
    }
    else if(!jogoStartado){
      console.log('Conexao negada.');
      ws.send('Alguem já abriu uma sala de outro game!'); 
    }

    if(`${message}`.split(" ")[0] == 'tron'){
        let salaDaMensagem = `${message}`.split(" ")[1];
        if(`${message}`.split(" ")[2] == 1){
          p1x = `${message}`.split(" ")[3];
          p1y = `${message}`.split(" ")[4];
          clientes[salaDaMensagem][1].send("Pos: " + p1x + " " + p1y); // recebe do 0 e envia pro um
        } 
        else if(`${message}`.split(" ")[2] == 2){
          p2x = `${message}`.split(" ")[3];
          p2y = `${message}`.split(" ")[4];
          clientes[salaDaMensagem][0].send("Pos: " + p2x + " " + p2y);   // recebe do 1 e envia pro zero
        }
    }
    // Verifique se há 2 clientes conectados e envie uma mensagem para ambos
    else if ( qtdClientesSala(numeroSalas) == 2) {
      setTimeout(enviarMensagemParaTodos, 100);
    }

  });


  // Evento de fechamento da conexão
  ws.on('close', () => {
    if(conectado){
      console.log('Cliente desconectado.');
      clientes.splice(clientes.indexOf(ws), 1);
      console.log(clientes.length);
      if(clientes.length < 2){
        // Iterar sobre todas as conexões e fechá-las
        clientes.forEach((cliente) => {
          cliente.send('Terminar exec');
          cliente.terminate();
        });

        // Limpar o array de clientes
        clientes.length = 0;
        //clientes = [];

        // Redefinir a variável jogoStartado para false
        jogoStartado = false;
      }
      console.log(clientes.length);
    }
  });

  //


});


// Função para enviar uma mensagem para todos os clientes conectados
function enviarMensagemParaTodos(index) {
  clientes[numeroSalas].forEach((clients, i) => {
    clients.send('Bora iniciar! ' + (i+1) );    // i+1 = player 1 ou player 2
    jogoStartado = true;
  });
  numeroSalas++;
  console.log(numeroSalas);
}


function adicionarAoSubarray(index, elemento) {
  // Verifica se o subarray no índice especificado existe
  if (!clientes[index]) {
      // Se não existir, cria um novo subarray nesse índice
      clientes[index] = [];
  }

  // Adiciona o elemento ao subarray
  clientes[index].push(elemento);
}


function qtdClientesSala(index) {
  if (!clientes[index]) {
    console.log('Zero clientes');
    return 0;
  }
  console.log(clientes[index].length + ' clientes');
  return clientes[index].length;
}