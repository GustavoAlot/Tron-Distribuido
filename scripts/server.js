const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });
console.log('Servidor WebSocket ouvindo na porta 3000');

// Array para armazenar as conexões dos clientes
const clientes = [];
var gameId;
let jogoStartado = false;

let p1x, p2x, p1y, p2y;


server.on('connection', (ws) => {
  
  let conectado = false; //firula


  // Evento de recebimento de mensagens do cliente
  ws.on('message', (message) => {
    console.log(`Mensagem do cliente: ${message}`);


    // Adcione a conexão do cliente ao array se estiverem no mesmo game
    if(clientes.length == 0 && !jogoStartado){
      gameId = `${message}`;
      clientes.push(ws);
      conectado = true;
      console.log('Cliente conectado.');
      ws.send('Aguardando o numero correto de jogadores para iniciar!');
    }
    else if(message == gameId && !jogoStartado){  
      clientes.push(ws);
      conectado = true;
      console.log('Cliente conectado.');
      ws.send('Ja vai comecar!'); 
    }
    else if(!jogoStartado){
      console.log('Conexao negada.');
      ws.send('Alguem já abriu uma sala de outro game!'); 
    }

    if(`${message}`.split(" ")[0] == 'tron'){

        if(`${message}`.split(" ")[1] == 1){
          p1x = `${message}`.split(" ")[2];
          p1y = `${message}`.split(" ")[3];
          clientes[1].send("Pos: " + p1x + " " + p1y); // recebe do 0 e envia pro um
        } 
        else if(`${message}`.split(" ")[1] == 2){
          p2x = `${message}`.split(" ")[2];
          p2y = `${message}`.split(" ")[3];
          clientes[0].send("Pos: " + p2x + " " + p2y);   // recebe do 1 e envia pro zero
        }
    }
    // Verifique se há 2 clientes conectados e envie uma mensagem para ambos
    else if (clientes.length == 2) {
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
function enviarMensagemParaTodos(mensagem) {
  clientes.forEach((clients, i) => {
    clients.send('Bora iniciar! ' + (i+1) );    // i+1 = player 1 ou player 2
    jogoStartado = true;
  });
}


/// QUANDO O NUMERO DE CLIENTES FOR ZERO, RESETA A VARIAVEL JOGOSTARTADO PRA FALSE!!!!!!!!
/// SINCRONIZAR OS DOIS QUANDO MORRER (GAMEOVER)
// --------------------------------------------------------------------------------------