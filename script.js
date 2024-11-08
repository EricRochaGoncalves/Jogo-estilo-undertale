let score = 1;                // Pontuação
let timeLeft = 5;             // Tempo inicial
let timer;                    // Variável para o temporizador
let dot;                      // O ponto a ser clicado
let startBtn;                 // O botão de "Começar"
let gameOverScreen;           // Tela de fim de jogo
let restartBtn;               // Botão de reiniciar
let moveSpeed = 1000;         // Velocidade inicial de movimentação do ponto (em ms)
let moveInterval;             // Variável para controlar a frequência de movimentação do ponto

// Função para iniciar o jogo
function startGame() {
    score = 0;
    timeLeft = 5;
    moveSpeed = 1000; // Reseta a velocidade inicial de movimento
    document.getElementById('score').textContent = `Vidas ♡: ${score}`;
    document.getElementById('timer').textContent = `Tempo: ${timeLeft}s`;

    startBtn.style.display = 'none'; // Esconde o botão de começar
    dot.classList.remove('hidden'); // Torna o ponto visível
    gameOverScreen.classList.remove('visible'); // Esconde a tela de fim de jogo
    dot.addEventListener('click', hitDot); // Adiciona o evento de clique no ponto
    startTimer(); // Inicia o contador de tempo
    startMovingDot(); // Inicia a movimentação periódica do ponto
}

// Função para iniciar o cronômetro
function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById('timer').textContent = `Tempo: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Função para iniciar a movimentação periódica do ponto
function startMovingDot() {
    moveInterval = setInterval(moveDot, moveSpeed);
}

// Função para quando o ponto for clicado
function hitDot() {
    score++;
    document.getElementById('score').textContent = `Vidas ♡: ${score}`;
    
    if (score % 10 === 0) {
        increaseDifficulty();
    }
    
    if (timeLeft < 5) timeLeft += 5;  
    if (timeLeft > 5) timeLeft = 5;  
    document.getElementById('timer').textContent = `Tempo: ${timeLeft}s`;
    moveDot(); // Move o ponto para uma nova posição aleatória
}

// Função para aumentar a dificuldade ao atingir múltiplos de 10 pontos
function increaseDifficulty() {
    moveSpeed = Math.max(300, moveSpeed - 100); // Reduz a velocidade até um mínimo de 200ms
    clearInterval(moveInterval);
    startMovingDot();
}

// Função para mover o ponto
function moveDot() {
    const maxX = 500; // Aumenta o máximo X dentro da área para aumentar o deslocamento
    const maxY = 900; // Aumenta o máximo Y dentro da área para aumentar o deslocamento
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    dot.style.left = randomX + 'px';
    dot.style.top = randomY + 'px';
}

// Função para encerrar o jogo
function endGame() {
    clearInterval(timer);
    clearInterval(moveInterval);
    dot.classList.add('hidden');
    gameOverScreen.classList.add('visible');
    document.getElementById('finalScore').textContent = score;
}

// Função para reiniciar o jogo
function restartGame() {
    score = 0;
    timeLeft = 5;
    moveSpeed = 1000;
    document.getElementById('score').textContent = `Vidas ♡: ${score}`;
    document.getElementById('timer').textContent = `Tempo: ${timeLeft}s`;
    startBtn.style.display = 'inline-block';
    gameOverScreen.classList.remove('visible');
}

// Funções de controle do botão
window.onload = function() {
    dot = document.getElementById('dot');
    startBtn = document.getElementById('startBtn');
    gameOverScreen = document.getElementById('gameOver');
    restartBtn = document.getElementById('restartBtn');
    
    startBtn.addEventListener('click', startGame);  // Começar o jogo
    restartBtn.addEventListener('click', restartGame); // Reiniciar o jogo
};
