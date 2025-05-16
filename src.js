let main_car = document.getElementById('main_car');
let enemy1 = document.getElementById('enemycar_1');
let enemy2 = document.getElementById('enemycar_2');
let enemy3 = document.getElementById('enemycar_3');
let enemy4 = document.getElementById('enemycar_4');
let start_btn = document.getElementById('start');
let score = document.getElementById('score');
let speedDisplay = document.getElementById('speed');
score.style.fontSize = '38px'; 
speedDisplay.style.fontSize = '38px';

let road = document.getElementById('road');
let backgroundPositionY = 0;
let speed = 2;
let isGameActive = false; 

let gameOverText = document.createElement('div');
let replayButton = document.createElement('button');

let gameMusic = document.getElementById('gameMusic');
let gameOverSound = document.getElementById('gameOverSound');
let speedUpSound = document.getElementById('speedUpSound'); 






gameOverText.innerText = 'Game Over';
gameOverText.style.position = 'absolute';
gameOverText.style.top = '40vh';
gameOverText.style.left = '44vw';
gameOverText.style.fontSize = '4rem';
gameOverText.style.color = 'white';
gameOverText.style.display = 'none'; 
document.body.appendChild(gameOverText); 

replayButton.innerText = 'Replay';
replayButton.style.position = 'absolute';
replayButton.style.top = '64vh';
replayButton.style.left = '51vw';
replayButton.style.fontSize = '2rem';
replayButton.style.display = 'none'; 
replayButton.style.padding = '10px 20px';
replayButton.style.cursor = 'pointer';
replayButton.style.backgroundColor = 'green';
replayButton.style.color = 'white';
document.body.appendChild(replayButton);


let gameOver = false;
let n = 0;





function animateRoad() {
  if (isGameActive) {
      backgroundPositionY += speed; 
      road.style.backgroundPositionY = `${backgroundPositionY}px`; 

      
      if (backgroundPositionY >= road.offsetHeight) {
          backgroundPositionY = 0;
      }

      
      requestAnimationFrame(animateRoad);
  }
}

start_btn.addEventListener('click', function() {
    let t = 58; 
    let l = 53; 
    isGameActive = true;
    backgroundPositionY = 0;
    animateRoad();

    start_btn.style.display = 'none';
    gameOverText.style.display = 'none';
    replayButton.style.display = 'none';
    gameMusic.play(); 

    let isUpArrowPressed = false;

window.addEventListener('keydown', function (X) {
    if (!gameOver) {
        if (X.keyCode === 38) { 
            isUpArrowPressed = true;
            speed += 1; 
            speedUpSound.play(); 
            speedDisplay.innerText = `Speed: ${speed} km/hr`; 
        }
        if (X.keyCode === 37) { 
            l -= 1;
        }
        if (X.keyCode === 39) { 
            l += 1;
        }
        main_car.style.left = `${l}vw`;
    }
});

window.addEventListener('keyup', function (X) {
    if (X.keyCode === 38) { 
        isUpArrowPressed = false;
    }
});


setInterval(() => {
    if (!gameOver && !isUpArrowPressed && speed > 2) { 
        speed -= 1; 
        speedDisplay.innerText = `Speed: ${speed} km/hr`; 
    }
}, 100);

    
    setInterval(() => {
        if (!gameOver) {
            let num = Math.floor(Math.random() * (38 - 35 + 1) + 35);
            enemy1.style.left = `${num}vw`;
        }
    }, 8000);

    setInterval(() => {
        if (!gameOver) {
            let num = Math.floor(Math.random() * (46 - 43 + 1) + 43);
            enemy2.style.left = `${num}vw`;
        }
    }, 6000);
  
    setInterval(() => {
        if (!gameOver) {
            let num = Math.floor(Math.random() * (59  - 54 + 1) + 54);
            enemy3.style.left = `${num}vw`;
        }
    }, 13000);

    setInterval(() => {
        if (!gameOver) {
            let num = Math.floor(Math.random() * (70 - 64 + 1) + 64);
            enemy4.style.left = `${num}vw`;
        }
    }, 12000);

    enemy1.style.animation = `enemycar1 8s linear infinite`; 
    enemy2.style.animation = `enemycar2 6s linear infinite`; 
    enemy3.style.animation = `enemycar3 13s linear infinite`; 
    enemy4.style.animation = `enemycar4 12s linear infinite`;

    
    setInterval(() => {
        if (!gameOver) {
            let mainCarRect = main_car.getBoundingClientRect();
            let enemy1Rect = enemy1.getBoundingClientRect();
            let enemy2Rect = enemy2.getBoundingClientRect();
            let enemy3Rect = enemy3.getBoundingClientRect();
            let enemy4Rect = enemy4.getBoundingClientRect();

            function isCollision(rect1, rect2) {
                return !(rect1.right < rect2.left ||
                         rect1.left > rect2.right ||
                         rect1.bottom < rect2.top ||
                         rect1.top > rect2.bottom);
            }

            let roadLeftBoundary = 36; 
            let roadRightBoundary = 69; 
        
            if (isCollision(mainCarRect, enemy1Rect) || 
                isCollision(mainCarRect, enemy2Rect) || 
                isCollision(mainCarRect, enemy3Rect) || 
                isCollision(mainCarRect, enemy4Rect) ||
                l < roadLeftBoundary || l > roadRightBoundary) {

                gameOver = true;
                isGameActive = false;
                gameOverText.innerText = `Game Over\nYour Score: ${n}`;
                gameOverText.style.display = 'block';
                replayButton.style.display = 'block';

                gameMusic.pause();
                gameOverSound.play();

                enemy1.style.animation = 'none';
                enemy2.style.animation = 'none';
                enemy3.style.animation = 'none';
                enemy4.style.animation = 'none';
            }
        }
    }, 100);

    
    setInterval(() => {
        if (!gameOver) {
            score.innerText = `Score: ${n}`;
            n++;
        }
    }, 100);

    
    replayButton.addEventListener('click', function() {
        location.reload(); 
    });
});