let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
	x: 8 * box,
	y: 8 * box,
};
let colisoes = document.querySelector("#colisoes");
let valor = 0;
let direction = "right";
let snakeX = snake[0].x;
let snakeY = snake[0].y;
let food = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box,
};

function criaBG() {
	context.fillStyle = "lightgreen";
	context.fillRect(0, 0, 16 * box, 16 * box);
}

function criaCobrinha() {
	for (i = 0; i < snake.length; i++) {
		context.fillStyle = "red";
		context.fillRect(snakeX, snakeY, box, box);
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

	snake.pop();
}

function verificaColisaoBorda() {
	if (snakeX > 15 * box && direction == "right") {
		snakeX = 0;
		valor++;
	}
	if (snakeX < 0 && direction == "left") {
		snakeX = 16 * box;
		valor++;
	}
	if (snakeY > 15 * box && direction == "down") {
		snakeY = 0;
		valor++;
	}
	if (snakeY < 0 && direction == "up") {
		snakeY = 16 * box;
		valor++;
	}
	colisoes.textContent = "Bateu na parede: " + valor + " vezes";
}

function drawFood() {
	context.fillStyle = "blue";
	context.fillRect(food.x, food.y, box, box);
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
}

let jogo = setInterval(iniciarJogo, 100);
