# 🚀 Tron Distribuído - Servidor de Jogo em JavaScript para Computação Paralela e Distribuída

Bem-vindo ao projeto Tron, desenvolvido como parte da disciplina de Computação Paralela e Distribuída na Universidade Federal de Alfenas!


<div align="center">
  <img width="85%" src="https://github.com/GutoVieoli/Tron-Distribuido/assets/88207253/3d482ac7-9af5-4c87-b095-e1c5e001fe80" alt="Tron Distribuido"/>
</div>

## 🎮 Visão Geral do Projeto

O Tron Multiplayer é um servidor em JavaScript que permite conectar clientes em uma mesma rede para jogar o clássico jogo Tron de forma multiplayer. O servidor é capaz de gerenciar várias salas, cada uma hospedando um jogo independente do Tron.

Para a concretização do projeto do jogo Tron distribuído, optamos por empregar uma combinação de JavaScript e Node.js, juntamente com a biblioteca Socket.IO. Essa decisão foi fundamentada na necessidade crucial de estabelecer uma comunicação eficiente e em tempo real entre o cliente e o servidor, um requisito essencial para jogos online.

## 🔧 Configuração e Instalação

Para configurar e executar o projeto em sua máquina local, siga estes passos:

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/GutoVieoli/Tron-Distribuido.git
   ```

2. **Execute o Servidor -** Va até a pasta scripts e execute o comando:
   ```bash
   node server.js
   ```

3. **Execute o Cliente.** Abra o arquico index.html no navegador de cada player.

## 🚀 Como Jogar

1. **Conectar ao Servidor:**
   Abra o cliente e insira o endereço IP do servidor.
   O servidor gerencia automaticamente as conexões, fazendo que nao seja necessário escolher uma sala.

2. **Iniciar o Jogo:**
   Assim que a sala estiver cheia, o jogo começará automaticamente.

3. **Controlar o player:**
   Utilize as teclas 'WASD' para controlar a direção de sua moto.

4. **Encerrar o Jogo:**
   Assim que um player se desconectar, o servidor encerrará automaticamente a conexão do outro player.

## 📸 Demonstrações em Vídeos
Abaixo podemos ver demonstrações do projeto rodando, aonde é possível ver a inicialição do server, conexão, e múltiplas salas rodando o jogo no mesmo server.

https://github.com/GutoVieoli/Tron-Distribuido/assets/88207253/d729cd37-612c-4f68-89e9-6338c98e0dec

<br>

https://github.com/GutoVieoli/Tron-Distribuido/assets/88207253/d328da1c-9985-4658-b9e0-b23cac7d83d9



## 📚 Tecnologias Utilizadas

- JavaScript
- Node.js
- Socket.io (para comunicação em tempo real)
- HTML e CSS para as interfaces

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorar o projeto.


Divirta-se jogando Tron Multiplayer! 🏍️🕹️
