let gameboard = document.getElementById('gameboard');
let resetbutton = document.getElementById('resetbutton');
let boxes = document.querySelectorAll('.box');
let message = document.getElementById('message');

let playerO = "🍪";
let playerX = "🍄";
let currentPlayer = playerO;

const winning_combo = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function checkforwin(currentPlayer) {
  for (let y = 0; y < winning_combo.length; y++) {
    const [a, b, c] = winning_combo[y];
    if (
      boxes[a].innerText === currentPlayer &&
      boxes[b].innerText === currentPlayer &&
      boxes[c].innerText === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function checkfortie() {
  for (let y = 0; y < boxes.length; y++) {
    if (boxes[y].innerText === '') {
      return false;
    }
  }
  return true;
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = currentPlayer;
    box.disabled = true;
    if(gameresult()){
      return 
    }
    if(currentPlayer === playerO){
      currentPlayer = playerX;
    }else{
      currentPlayer = playerO;
    }
    message.textContent = currentPlayer + "'s turn!"
  });
});

function gameresult() {
  if (checkforwin(currentPlayer)) {
    message.textContent = "Player " + currentPlayer + " won!";
    boxes.forEach((box) => {
      box.disabled = true;
    });
    return true
  } else if (checkfortie()) {
    message.textContent = "It's a tie!"
    boxes.forEach((box) => {
      box.disabled = true;
    });
    return true
  }
  return false
}

resetbutton.addEventListener("click",resetgame);

function resetgame() {
  for (let y = 0; y < boxes.length; y++) {
    boxes[y].innerText = "";
    boxes[y].disabled = false; 
  }
  currentPlayer = playerO;
  message.textContent = "Player " + currentPlayer + " start!";
}