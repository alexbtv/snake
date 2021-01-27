import "./assets/styles/styles.scss";
import {toto} from './assets/javascripts/fruits';

import img from './assets/images/pomme.png';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const scoreArea = document.querySelector(".score");
const bestScoreArea = document.querySelector(".best-score");
const startGame = document.querySelector(".btn-start");

const appleImg = new Image();
appleImg.src=img;

appleImg.onload = ()=>{
  //ctx.drawImage(appleImg, apple[0] * gridElem,apple[1] * gridElem, gridElem,gridElem);
}


const breakGame = document.createElement('button');
breakGame.classList.add('btn-stop');
breakGame.innerText="BREAK";

let inProgress=0;

const play=document.querySelector(".play");

let speed = 900;

const gridElem = 20; //500*500
let snake = [
  [9, 9],
  [8, 9],
  [7, 9],
];

let apple = [5, 5];

let direction = "e";

let score = 0;

let requestId = null;


window.addEventListener("keydown", (event) => {
  console.log(event);
  switch (event.key) {
    case "ArrowRight": {
      direction = "e";
      break;
    }
    case "ArrowLeft": {
      direction = "o";
      break;
    }
    case "ArrowUp": {
      direction = "n";
      break;
    }
    case "ArrowDown": {
      direction = "s";
      break;
    }
  }
});

const drawMap = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 500, 500);
};

const drawSnake = () => {
  ctx.fillStyle = "green";

  for (let body of snake) {
    ctx.fillRect(body[0] * gridElem, body[1] * gridElem, gridElem, gridElem);
  }
};

const drawApple = () => {
  console.log("je suis la");
  //ctx.fillStyle = "red";
 // ctx.fillRect(apple[0] * gridElem, apple[1] * gridElem, gridElem, gridElem);

    ctx.drawImage(appleImg, apple[0] * gridElem,apple[1] * gridElem, gridElem,gridElem);
};

const drawScore = () => {
  scoreArea.innerHTML = `<h1>SCORE</h1>
  <p>${score}</p>
  <h3>Speed</h3>
  <p>1</p>`;
};

const drawBestScore = () => {
  bestScoreArea.innerHTML = `<h1>BEST SCORES</h1>
  <ul>
  <li>Alex : 800</li>
  <li>Alex : 600</li>
  <li>Laet : 550</li>
  <li>Emma : 540</li>
  </ul>`;
};

const gameOver = () => {
  if (
    snake[0][0] > 24 ||
    snake[0][0] < 0 ||
    snake[0][1] > 24 ||
    snake[0][1] < 0
  ) {
    return true;
  } else {
    const [head, ...body] = snake; //deconstruction de snake : le premier elem(la tete) dans head et le reste (le corps) dans body.
    //on compare la tete avec chaque elem de body pour vérifier que si c'est egal, c'est qu'on se mord.
    for (let bodyElem of body) {
      if (bodyElem[0] === head[0] && bodyElem[1] === head[1]) {
        return true;
      }
    }
  }
  return false;
};

const updateSnakePosition = () => {
  let head;
  switch (direction) {
    case "e": {
      head = [snake[0][0] + 1, snake[0][1]];
      break;
    }
    case "o": {
      head = [snake[0][0] - 1, snake[0][1]];
      break;
    }
    case "s": {
      head = [snake[0][0], snake[0][1] + 1];
      break;
    }
    case "n": {
      head = [snake[0][0], snake[0][1] - 1];

      break;
    }
  }

  snake.unshift(head);
  if (head[0] === apple[0] && head[1] === apple[1]) {
    generateApple();
  } else {
    snake.pop();
  }

  return gameOver();
};

const generateApple = () => {
  score = score + 10;
  const [x, y] = [
    Math.trunc(Math.random() * 24),
    Math.trunc(Math.random() * 24),
  ];
  apple = [x, y];
  for (let body of snake) {
    if (body[0] === x && body[1] === y) {
      return generateApple();
    }
  }
};

const initCanvas = () => {
  drawMap();
  drawSnake();
  drawApple();
  drawScore();
  drawBestScore();
};

const move = () => {

  if (!updateSnakePosition() && inProgress===0) {
    initCanvas();
    setTimeout(() => {
      requestId = requestAnimationFrame(move);
    }, 1000 - speed);
  } else if (!updateSnakePosition() && inProgress===1) {
    window.cancelAnimationFrame(requestId);
  } else {
    alert("Perdu !");
    reinitGame();
  }
};

const reinitGame= ()=>{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  initCanvas();
  snake = [
    [9, 9],
    [8, 9],
    [7, 9],
  ];
  
  apple = [5, 5];
  
  direction = "e";
  
  score = 0;
  deleteBreakButton();
}

initCanvas();

const deleteBreakButton = ()=>{ 
  play.removeChild(breakGame);
  play.append(startGame)
};

const addBreakButton = ()=> {
  inProgress=0;
  play.append(breakGame);
  breakGame.addEventListener("click", (event2) => {
    event2.stopImmediatePropagation();
    inProgress=1;
    console.log(startGame);
    deleteBreakButton();
  })
  play.removeChild(startGame);
}


startGame.addEventListener("click", (event) => {
  addBreakButton();
toto();

    /*ctx.clearRect(0, 0, canvas.width, canvas.height);*/

    requestId = requestAnimationFrame(move);
});
