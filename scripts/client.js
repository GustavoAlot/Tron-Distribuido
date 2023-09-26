const HOST = 'ws://localhost:3000'; // Endereço do servidor WebSocket
const socket = new WebSocket(HOST);

socket.onopen = (event) => {
  console.log('Conectado ao servidor.');
  // Envie uma mensagem para o servidor quando a conexão estiver aberta
  socket.send('Olá, servidor!');
};

socket.onmessage = (event) => {
  const message = event.data;
  console.log(`Mensagem do servidor: ${message}`);
  // Encerre a conexão após receber uma resposta (opcional)
  //socket.close();  ------------
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