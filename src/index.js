import "./assets/styles/styles.scss";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const speed = 800;

const gridElem = 40; //20*20
const snake = [
  [9, 9],
  [8, 9],
  [7, 9],
];

let apple = [5, 5];

let direction = "e";

let score = 0;

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
  ctx.fillRect(0, 0, 800, 800);
};

const drawSnake = () => {
  ctx.fillStyle = "green";
  for (let body of snake) {
    ctx.fillRect(body[0] * gridElem, body[1] * gridElem, gridElem, gridElem);
  }
};

const drawApple = () => {
  console.log("je suis la");
  ctx.fillStyle = "red";
  ctx.fillRect(apple[0] * gridElem, apple[1] * gridElem, gridElem, gridElem);
};

const drawScore = () => {
  ctx.fillStyle = "blue";
  ctx.font = "40px sans-serif";
  ctx.textBaseLine = "top";
  ctx.fillText(`score : ${score}`,gridElem,gridElem);
};

const gameOver = () => {
  if (
    snake[0][0] > 19 ||
    snake[0][0] < 0 ||
    snake[0][1] > 19 ||
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
  score++;
  const [x, y] = [
    Math.trunc(Math.random() * 19),
    Math.trunc(Math.random() * 19),
  ];
  apple = [x, y];
  for (let body of snake) {
    if (body[0] === x && body[1] === y) {
      return generateApple();
    }
  }
};

const move = () => {
  if (!updateSnakePosition()) {
    drawMap();
    drawSnake();
    drawApple();
    drawScore();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, 1000 - speed);
  } else {
    alert("Perdu !");
  }
};

requestAnimationFrame(move);
