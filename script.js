let score = 1;
let timeLeft = 8.0;
let bossHealth = 50;
let maxBossHealth = 50;
let timer, dot, startBtn, gameOverScreen, restartBtn, moveSpeed = 1000, moveInterval;

// Função de animação de digitação
function typeText(element, text, speed = 50) {
    element.innerHTML = ''; // Limpa o conteúdo
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

function startGame() {
    score = 0;
    timeLeft = 8.0;
    bossHealth = maxBossHealth;
    moveSpeed = 1000;
    document.getElementById('score').textContent = `Vidas ♡: ${score}`;
    document.getElementById('timer').textContent = `Tempo: ${timeLeft.toFixed(1)}s`;
    document.getElementById('timeFill').style.width = '100%';
    document.getElementById('bossHealthText').textContent = `Vida do Chefe: ${bossHealth}`;
    document.getElementById('bossHealthFill').style.width = '100%';

    // Animação dos títulos iniciais
    
    typeText(document.getElementById('gameTitle2'), 'Me derrote, ao menos tente, se for capaz. Hahahaha!');

    startBtn.style.display = 'none';
    dot.classList.remove('hidden');
    gameOverScreen.classList.remove('visible');
    dot.addEventListener('click', hitDot);
    startTimer();
    startMovingDot();
}

function startTimer() {
    timer = setInterval(function() {
        timeLeft -= 0.1;
        document.getElementById('timer').textContent = `Tempo: ${timeLeft.toFixed(1)}s`;
        document.getElementById('timeFill').style.width = `${(timeLeft / 8) * 100}%`;
        if (timeLeft <= 0) endGame(false);
    }, 100);
}

function startMovingDot() {
    moveInterval = setInterval(moveDot, moveSpeed);
}

function hitDot() {
    score++;
    bossHealth -= 5; // Chefe perde 5 pontos de vida por clique
    document.getElementById('score').textContent = `Vidas ♡: ${score}`;
    document.getElementById('bossHealthText').textContent = `Vida do Chefe: ${bossHealth}`;
    document.getElementById('bossHealthFill').style.width = `${(bossHealth / maxBossHealth) * 100}%`;
    
    dot.classList.add('clicked');
    setTimeout(() => {
        dot.classList.remove('clicked');
        moveDot();
    }, 100);

    // Mudança de texto na metade da vida
    if (bossHealth <= maxBossHealth / 2 && bossHealth > 0) {
        typeText(document.getElementById('gameTitle2'), 'Você nunca irá me vencer!');
    }

    if (bossHealth <= 0) {
        endGame(true);
    } else {
        if (score % 10 === 0) increaseDifficulty();
        if (timeLeft < 8) timeLeft += 8;
        if (timeLeft > 8) timeLeft = 8;
    }
}

function increaseDifficulty() {
    moveSpeed = Math.max(300, moveSpeed - 100);
    clearInterval(moveInterval);
    startMovingDot();
}

function moveDot() {
    const container = document.querySelector('.game-container');
    const dotSize = dot.offsetWidth;
    const maxX = container.clientWidth - dotSize;
    const minY = 250;
    const maxY = container.clientHeight - dotSize;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * (maxY - minY)) + minY;
    dot.style.left = randomX + 'px';
    dot.style.top = randomY + 'px';
}

function endGame(victory) {
    clearInterval(timer);
    clearInterval(moveInterval);
    dot.classList.add('hidden');
    gameOverScreen.classList.add('visible');
    document.getElementById('finalScore').textContent = score;
    if (victory) {
        typeText(document.getElementById('gameOverTitle'), "Vitória!");
        document.getElementById('restartBtn').textContent = "Jogar Novamente?";
    } else {
        typeText(document.getElementById('gameOverTitle'), "Fim de Jogo!");
        document.getElementById('restartBtn').textContent = "";
        typeText(document.getElementById('restartBtn'), 'Você falhou... como eu previ. Tentar novamente?');
    }
}

function restartGame() {
    score = 0;
    timeLeft = 8.0;
    bossHealth = maxBossHealth;
    moveSpeed = 1000;
    document.getElementById('score').textContent = `Vidas ♡: ${score}`;
    document.getElementById('timer').textContent = `Tempo: ${timeLeft.toFixed(1)}s`;
    document.getElementById('bossHealthText').textContent = `Vida do Chefe: ${bossHealth}`;
    document.getElementById('timeFill').style.width = '100%';
    document.getElementById('bossHealthFill').style.width = '100%';
    startBtn.style.display = 'inline-block';
    gameOverScreen.classList.remove('visible');
    typeText(document.getElementById('gameTitle2'), 'Colete as vidas ... ou ao menos tente, se for capaz. Hahahaha!');
}

window.onload = function() {
    dot = document.getElementById('dot');
    startBtn = document.getElementById('startBtn');
    gameOverScreen = document.getElementById('gameOver');
    restartBtn = document.getElementById('restartBtn');
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);

    // Animação inicial dos títulos
    
    typeText(document.getElementById('gameTitle2'), ' Me derrote, ao menos tente, se for capaz. Hahahaha!');
};