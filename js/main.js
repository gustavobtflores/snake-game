let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
	x: 8 * box,
	y: 8 * box,
};
let direction = "right";
let snakeX = snake[0].x;
let snakeY = snake[0].y;
let food = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box,
};
let pontos = 0;
let pontuacao = document.querySelector("#pontuacao");

function criaBG() {
	context.fillStyle = "lightgreen";
	context.fillRect(0, 0, 16 * box, 16 * box);
}

function criaCobrinha() {
	for (i = 0; i < snake.length; i++) {
		context.fillStyle = "red";
		context.fillRect(snake[i].x, snake[i].y, box, box);
	}
}

function criaCabecaCobrinha() {
	let newHead = {
		x: snakeX,
		y: snakeY,
	};

	snake.unshift(newHead);
}

function movimentaCobrinha() {
	if (direction == "right") snakeX += box;
	if (direction == "left") snakeX -= box;
	if (direction == "up") snakeY -= box;
	if (direction == "down") snakeY += box;
}

function verificaColisaoBorda() {
	if (snakeX > 16 * box && direction == "right") {
		clearInterval(jogo);
		alert("Game Over :'(");
		location.reload();
	}
	if (snakeX < -32 && direction == "left") {
		clearInterval(jogo);
		alert("Game Over :'(");
		location.reload();
	}
	if (snakeY > 16 * box && direction == "down") {
		clearInterval(jogo);
		alert("Game Over :'(");
		location.reload();
	}
	if (snakeY < -32 && direction == "up") {
		clearInterval(jogo);
		alert("Game Over :'(");
		location.reload();
	}
}

function drawFood() {
	context.fillStyle = "blue";
	context.fillRect(food.x, food.y, box, box);
}

function verificaFood() {
	if (snakeX != food.x || snakeY != food.y) {
		snake.pop();
	} else {
		food.x = Math.floor(Math.random() * 15 + 1) * box;
		food.y = Math.floor(Math.random() * 15 + 1) * box;
		pontos++;
		pontuacao.textContent = "Pontuação: " + pontos;
	}
}

function verificaColisaoNaCobrinha() {
	for (i = 1; i < snake.length; i++) {
		if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
			clearInterval(jogo);
			alert("Game Over :'(");
			location.reload();
		}
	}
}

document.addEventListener("keydown", update);

function update(event) {
	if (event.keyCode == 37 && direction != "right") direction = "left"; //para esquerda
	if (event.keyCode == 38 && direction != "down") direction = "up"; //para cime
	if (event.keyCode == 39 && direction != "left") direction = "right"; //para direita
	if (event.keyCode == 40 && direction != "up") direction = "down"; //para baixo
}

function iniciarJogo() {
	criaBG();
	criaCobrinha();
	movimentaCobrinha();
	criaCabecaCobrinha();
	verificaColisaoBorda();
	drawFood();
	verificaFood();
	verificaColisaoNaCobrinha();
}

let jogo = setInterval(iniciarJogo, 100);
