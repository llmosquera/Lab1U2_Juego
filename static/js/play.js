
//Para poner el ancho del cuadrado que se va a jugar
var canvasWidth = 800;
//Para poner la altura del cuadrado
var canvasHeight =400;
// Una variabe Player
var player;
//Es para dar valor a la posicion 
var playerYPosition = 200;
//Aqui se crea una variable para dar valor a la caida 
var fallSpeed = 0;
//Crea un nuevo intervalo de canvas
var interval = setInterval(updateCanvas, 20);

//Crea una propiedad booleana
var isJumping = false;
//Aqui se da un valor inicial 
var jumpSpeed = 0;
//Se crea una variable para definir los bloques
var block;

//Crear una puntuación de 0 para empezar
var score = 0;
// Cree una variable para contener nuestro scoreLabel
var scoreLabel;
//Aqui se va a crear la respectiva funcion del juego
function startGame() {
    //es para llamar 
    gameCanvas.start();
    //Se crea el juego con las funciones
    player = new createPlayer(30, 30, 10);
    //Aqui se crea las variables
    block = new createBlock();
    // Assign your scoreLabel variable a value from scoreLabel()
    scoreLabel = new createScoreLabel(10, 30);
}

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}
//Se crea una funcion 
function createPlayer(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;
    //Aqui se crea para y se define los dibujos
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    //Se crea aqui la funcion de mover al jugador
    this.makeFall = function() {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            this.stopPlayer();
        }
    }
    //Aqui se crea la funcion para parar el juego cuando se pierde
    this.stopPlayer = function() {
        var ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }
    //aqui se crea la funcion para poder saltar
    this.jump = function() {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
}
//Aqui s ecrea la funcion para crear los bloques
function createBlock() {
    //Aqui se define el ancho del bloque
    var width = randomNumber(10, 50);
    //Aqui se define el largo del bloque
    var height = randomNumber(10, 200);
    //Aqui se define la velocidad del bloque
    var speed = randomNumber(2, 6);

    this.x = canvasWidth;
    this.y = canvasHeight - height;
    
    //aqui se crea el bloque
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, width, height);
    }
    //Aqui se pone la velocidad en que va a correr
    this.attackPlayer = function() {
        this.x -= speed;
        this.returnToAttackPosition();
    }
    //Aqui se define los tipos de bloques
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Increase your score if your block made it to the edge
            score++;
        }
    }
}
//aqui se define la funcion para poner pausa al juego
function detectCollision() {
    var playerLeft = player.x
    var playerRight = player.x + player.width;
    var blockLeft = block.x;
    var blockRight = block.x + block.width;
    
    var playerBottom = player.y + player.height;
    var blockTop = block.y;
    
    if (playerRight > blockLeft && 
        playerLeft < blockLeft && 
        playerBottom > blockTop) {
        
        gameCanvas.stop();
    }
}
//crea la funcion de las "x" y "y"
function createScoreLabel(x, y) {
    this.score = 0;  
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "25px Marker Felt";
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x, this.y);
    }
}
//Aqui e soara dar la funcion del jugador para saltar y volver a caer en la posicion que incio
function updateCanvas() {
    detectCollision();
    
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    player.makeFall();
    player.draw();
    player.jump();
    
    block.draw();
    block.attackPlayer();
    
    // Redraw your score and update the value
    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//Aqui se crea la funcion para empezar de nuevo el salto
function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function() { resetJump(); }, 1000);
    }
}

