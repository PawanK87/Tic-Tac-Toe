let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

//Game constants
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null); // Array to track the state of the board

const startGame = ()=> {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

//Handle Click Event
function boxClicked(e) {
   const id = e.target.id;

   if(!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if(playerHasWon() !==false) {
        playerText = `${currentPlayer} has won!`;
        let winning_blocks = playerHasWon();

        winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
        return
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;

   }
}

const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHasWon() {
    for (const condition of winningCombo) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);
 
function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = '';
        box.style.backgroundColor=''
    })

    playerText = `Tic Tac Toe`;

    currentPlayer = X_TEXT;
}

//Initialize the game
startGame();

