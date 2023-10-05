const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });
console.log('Servidor WebSocket ouvindo na porta 3000');

// Array para armazenar as conexões dos clientes
const clientes = [];
var gameId;


server.on('connection', (ws) => {

  let conectado = false;

  // Evento de recebimento de mensagens do cliente
  ws.on('message', (message) => {
    console.log(`Mensagem do cliente: ${message}`);

    // Adcione a conexão do cliente ao array se estiverem no mesmo game
    if(clientes.length == 0){
      gameId = `${message}`;
      clientes.push(ws);
      conectado = true;
      console.log('Cliente conectado.');
      ws.send('Aguardando o numero correto de jogadores para iniciar!');
    }
    else if(message == gameId){
      clientes.push(ws);
      conectado = true;
      console.log('Cliente conectado.');
      ws.send('Aguardando o numero correto de jogadores para iniciar!');     
    }
    else{
      console.log('Conexao negada.');
      ws.send('Alguem já abriu uma sala de outro game!'); 
    }
  });


  // Evento de fechamento da conexão
  ws.on('close', () => {
    if(conectado){
      console.log('Cliente desconectado.');
      clientes.splice(clientes.indexOf(ws), 1);
    }
  });

  // Verifique se há 2 clientes conectados e envie uma mensagem para ambos
  if (clientes.length === 2) {
    setTimeout(enviarMensagemParaTodos, 1000);
  }
  console.log(clientes.length)


});


// Função para enviar uma mensagem para todos os clientes conectados
function enviarMensagemParaTodos(mensagem) {
  clientes.forEach((clients) => {
    clients.send('Ja temos 2 Players, vamos começar!!');
  });
}