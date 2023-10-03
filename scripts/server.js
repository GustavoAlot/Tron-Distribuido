const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (ws) => {
  console.log('Cliente conectado.');

  // Evento de recebimento de mensagens do cliente
  ws.on('message', (message) => {
    console.log(`Mensagem do cliente: ${message}`);

    // Envie uma mensagem de volta para o cliente
    ws.send('Dobra e dá pro próximo!');
  });

  // Evento de fechamento da conexão
//   ws.on('close', () => {
//     console.log('Cliente desconectado.');
//   });
});

console.log('Servidor WebSocket ouvindo na porta 3000');