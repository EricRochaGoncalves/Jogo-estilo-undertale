let score = 0;               // Pontuação
let timeLeft = 30;           // Tempo inicial
let timer;                   // Variável para o temporizador
let dot;                     // O ponto a ser clicado
let startBtn;                // O botão de "Começar"
let gameOverScreen;          // Tela de fim de jogo
let restartBtn;              // Botão de reiniciar

// Função para iniciar o jogo
function startGame() {
    score = 0;
    timeLeft = 30;
    document.getElementById('score').textContent = `Pontos: ${score}`;
    document.getElementById('timer').textContent = `Tempo: ${timeLeft}s`;

    startBtn.style.display = 'none'; // Esconde o botão de começar
    dot.classList.remove('hidden'); // Torna o ponto visível
    gameOverScreen.classList.remove('visible'); // Esconde a tela de fim de jogo
    dot.addEventListener('click', hitDot); // Adiciona o evento de clique no ponto
    startTimer(); // Inicia o contador de tempo
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

// Função para quando o ponto for clicado
function hitDot() {
    score++;
    document.getElementById('score').textContent = `Pontos: ${score}`;
    if (timeLeft < 30) timeLeft += 3;  // Adiciona mais tempo, mas não ultrapassa 30s
    if (timeLeft > 30) timeLeft = 30;  // Limita o tempo a 30 segundos
    document.getElementById('timer').textContent = `Tempo: ${timeLeft}s`;
    moveDot(); // Move o ponto para uma nova posição aleatória
}

// Função para mover o ponto
function moveDot() {
    const maxX = 350; // Máximo X dentro da área
    const maxY = 350; // Máximo Y dentro da área
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    dot.style.left = randomX + 'px';
    dot.style.top = randomY + 'px';
}

// Função para encerrar o jogo
function endGame() {
    clearInterval(timer);
    dot.classList.add('hidden');
    gameOverScreen.classList.add('visible');
    document.getElementById('finalScore').textContent = score;
}

// Função para reiniciar o jogo
function restartGame() {
    score = 0;
    timeLeft = 30;
    document.getElementById('score').textContent = `Pontos: ${score}`;
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







