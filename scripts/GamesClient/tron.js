let canvas, ctx, WIDTH, HEIGHT;
let SCL = 10;
let player1, player2;
let SPEED = 0.5;
let reiniciar = false;
let numPlayer;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  

class Bike {
    constructor(x, y, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.trail = [];
    }

    update() {
        this.trail.push({ x: this.x, y: this.y });
        
        this.x += this.dx * SCL * SPEED;
        this.y += this.dy * SCL * SPEED;
    }


    draw() {
        ctx.shadowBlur = 10;          // Define o desfoque da sombra
        ctx.shadowColor = this.color; // Define a cor da sombra para ser a mesma da moto
    
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, SCL, SCL);
            
        this.trail.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, SCL, SCL);
        });
    
        ctx.shadowBlur = 0; // Redefine o desfoque da sombra
    }

    changeDirection(dx, dy) {
        if (this.dx === 0 && this.dy === dy || this.dy === 0 && this.dx === dx) return;
        this.dx = dx;
        this.dy = dy;
    }

    checkCollision(otherTrail) {
        for (let segment of this.trail) {
            if (segment.x === this.x && segment.y === this.y) {
                return true;
            }
        }

        for (let segment of otherTrail) {
            if (segment.x === this.x && segment.y === this.y) {
                return true;
            }
        }

        return this.x < 0 || this.x >= WIDTH || this.y < 0 || this.y >= HEIGHT;
    }
}

async function update() {


    if (player1.checkCollision(player2.trail) || player2.checkCollision(player1.trail)) {
        await sleep(700);
        reiniciar = true;
        restartTron();
        

        //document.location.reload();
    } else {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        // Definir o background como preto
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        
        drawGrid(); 
    
        player1.update();
        player2.update();
    
        player1.draw();
        player2.draw();       
    }
}

function drawGrid() {
    ctx.strokeStyle = '#ADD8E6';  // Cor azul bebê
    ctx.lineWidth = 0.8;          // Linha fina

    // Desenhar linhas verticais
    for (let x = 0; x <= WIDTH; x += SCL*5) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
        ctx.stroke();
    }

    // Desenhar linhas horizontais
    for (let y = 0; y <= HEIGHT; y += SCL*5) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(WIDTH, y);
        ctx.stroke();
    }
}

document.addEventListener('keydown', (event) => {
    if(numPlayer == 1){
        switch (event.keyCode) {
            case 65: player1.changeDirection(-1, 0); enviaPos(); break;
            case 87: player1.changeDirection(0, -1); enviaPos(); break;
            case 68: player1.changeDirection(1, 0);  enviaPos(); break;
            case 83: player1.changeDirection(0, 1);  enviaPos(); break;
        }
    }
    else if(numPlayer == 2){
        switch (event.keyCode) {
            case 65: player2.changeDirection(-1, 0); enviaPos(); break;
            case 87: player2.changeDirection(0, -1); enviaPos(); break;
            case 68: player2.changeDirection(1, 0); enviaPos(); break;
            case 83: player2.changeDirection(0, 1); enviaPos(); break;
        }
    }
});


function carregarTron() {
    canvas = document.querySelector('canvas');
    canvas.width = 1400;
    canvas.height = 750;
    ctx = canvas.getContext('2d');

    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    player1 = new Bike(50, HEIGHT / 2, 1, 0, '#ad63f2');
    player2 = new Bike(WIDTH - 50, HEIGHT / 2, -1, 0, '#00ffd0');

    document.addEventListener('keydown', (event) => {
        if(numPlayer == 1){
            switch (event.keyCode) {
                case 65: player1.changeDirection(-1, 0); break;
                case 87: player1.changeDirection(0, -1); break;
                case 68: player1.changeDirection(1, 0); break;
                case 83: player1.changeDirection(0, 1); break;
            }
        }
        else if(numPlayer == 2){
            switch (event.keyCode) {
                case 65: player2.changeDirection(-1, 0); break;
                case 87: player2.changeDirection(0, -1); break;
                case 68: player2.changeDirection(1, 0); break;
                case 83: player2.changeDirection(0, 1); break;
            }
        }
    });
    
    if(!reiniciar)
        setInterval(update, 1000 / 60); // Atualiza 15 vezes por segundo
}


function restartTron(){
    SPEED = 0.5;
    SCL = 10;
    carregarTron();
}

function setNumPlayer(numJogador){
    numPlayer = numJogador;
}

function getPosition(){
    if(numPlayer == 1)
        return `1 ${player1.dx} ${player1.dy}`;
    else if(numPlayer == 2)
        return `2 ${player2.dx} ${player2.dy}`;
}

function atualizaRival(mensagem){
    if(numPlayer == 1){
        let x = parseInt(`${mensagem}`.split(" ")[1]);
        let y = parseInt(`${mensagem}`.split(" ")[2]);
        console.log(x + " " + y + " -----------")
        player2.changeDirection(x, y);
    }
    else if(numPlayer == 2){
        let x = parseInt(`${mensagem}`.split(" ")[1]);
        let y = parseInt(`${mensagem}`.split(" ")[2]);
        console.log(x + " " + y + " -----------")
        player1.changeDirection(x, y);
    }
}
