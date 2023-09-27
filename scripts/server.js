const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

// Array para armazenar as conexões dos clientes
const clientes = [];

server.on('connection', (ws) => {

  // Adcione a conexão do cliente ao array
  clientes.push(ws);
  console.log('Cliente conectado.');
  //console.log(clientes)


  // Evento de recebimento de mensagens do cliente
  ws.on('message', (message) => {
    console.log(`Mensagem do cliente: ${message}`);

    // Envie uma mensagem de volta para o cliente
    ws.send('Aguardando o numero correto de jogadores para iniciar!');
  });


  // Evento de fechamento da conexão
  ws.on('close', () => {
    console.log('Cliente desconectado.');

    // Remova o cliente do array
    clientes.splice(clientes.indexOf(ws), 1);
  });

  // Verifique se há 2 clientes conectados e envie uma mensagem para ambos
  if (clientes.length === 2) {
    setTimeout(enviarMensagemParaTodos, 1000);
  }
  console.log(clientes.length)


});

console.log('Servidor WebSocket ouvindo na porta 3000');

// Função para enviar uma mensagem para todos os clientes conectados
function enviarMensagemParaTodos(mensagem) {
  clientes.forEach((clients) => {
    clients.send('Ja temos 2 Players, vamos começar!!');
  });
}