/*the DOM should be responsible for reading and displaying the application state to the user and providing an easy-to-use gateway to interact with the methods it needs to.*/

const GameBoard = (() => {
    const gameBoard= ["", "", "", "", "", "", "", "", ""];



    function getTheGameBoard(){
        return gameBoard;
    }


    function placeMarker(position, marker) {
    if(gameBoard[position] === ""){
        gameBoard[position] = marker;
        return true;
    }else{ 
        console.log("Error, Pick another Spot.");
        return false;

    }
}

function resetBoard(){
    for(let i = 0; i < gameBoard.length; i++){
        gameBoard[i] = "";
    }
}


    return{
        getTheGameBoard,
        placeMarker,
        resetBoard
    };

})();
GameBoard.getTheGameBoard();



const Player = (name, marker)=> {
    return {
        name, 
        marker
    }
};


const Game = (() =>{
    const playerOne = Player("Player 1", "X");
    const playerTwo = Player("Player 2", "O");

    let currentPlayer = playerOne;
    let gameOver = false;
    let gameStarted  = false;

    
    function switchPlayer() {
        if(currentPlayer === playerOne){
            currentPlayer = playerTwo;
        } else{
            currentPlayer = playerOne
        }
    }



    function getCurrentPlayer() {
    return currentPlayer;
}

function setPlayerNames(nameOne, nameTwo) {
    playerOne.name = nameOne;
    playerTwo.name = nameTwo;
}


function startGame(){
    gameStarted = true;
    gameOver = false;
}

function checkWinner() {
    const board = GameBoard.getTheGameBoard();

    const winningCombinations = [
          [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6]
    ];

     for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return combination;
        }
    }

    return false;
};



function playRound(position) {
   if (!gameStarted){
    return;
   }


    if (gameOver) {
        return "Game is Over. Start Fresh";

    }

    const moveSuccessful =GameBoard.placeMarker(
        position,
        currentPlayer.marker
    );

    if(moveSuccessful) {
        const winningCombination = checkWinner();

        if(winningCombination){
            switchPlayer();
            gameOver = true;
             return {
                message: `${currentPlayer.name} wins!`,
                winningCells: winningCombination
             }
        } else if (checkTie()){
         gameOver = true;
         return "It's a tie!";
        }
            else{
                    switchPlayer();
        }
    }
};

function checkTie(){
    const board = GameBoard.getTheGameBoard();

    return board.every(position => position !== "");
}


 function restartGame() {
    GameBoard.resetBoard();
    currentPlayer = playerOne;
    gameOver = false;
    gameStarted = true;
}



    return {
        playerOne,
        playerTwo,
        currentPlayer,
        playRound,
        switchPlayer,
        getCurrentPlayer,
        setPlayerNames,
        startGame,
        checkWinner,
        playRound,
        checkTie,
        restartGame
    };

})();



const DisplayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const turnDisplay = document.querySelector(".turn-display");
    const resultDisplay = document.querySelector(".result-display");
    const restartButton = document.querySelector("#restart-btn");


    const playerOneInput = document.querySelector("#player-one-name");
        const board = GameBoard.getTheGameBoard();
const playerTwoInput = document.querySelector("#player-two-name");
const startGameButton = document.querySelector("#start-game-btn");

    function renderBoard() {

        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    }

    function highlightWinningCells(winningCells) {
    winningCells.forEach((index) => {
        cells[index].classList.add("winning-cell");
    });
}


    function renderTurn() {
        const currentPlayer = Game.getCurrentPlayer();

        turnDisplay.textContent = `${currentPlayer.name}'s turn`;
    }

    function renderResult(message) {
        resultDisplay.textContent = message;
    }

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            const index = cell.dataset.index;

            const result = Game.playRound(index);

            renderBoard();

            if (result) {
                if (typeof result === "object"){
                 renderResult(result.message);
                 highlightWinningCells(result.winningCells);

                }else{
                    renderResult(result);
                }
                
            } else {
                renderTurn();
            }
        });
    });

startGameButton.addEventListener("click", () => {
    const playerOneName = playerOneInput.value.trim();
    const playerTwoName = playerTwoInput.value.trim();

    if (playerOneName === "" || playerTwoName === "") {
        return;
    }

    Game.setPlayerNames(playerOneName, playerTwoName);
    
    
    playerOneInput.disabled = true;
    Game.startGame();
    playerTwoInput.disabled = true;
    startGameButton.disabled = true;

    renderBoard();
    renderTurn();
    renderResult("");
});


function clearWinningCells() {
    cells.forEach((cell) => {
        cell.classList.remove("winning-cell");
    });
}

restartButton.addEventListener("click", () => {
    Game.restartGame();
     
    clearWinningCells();
    renderBoard();
    renderTurn();
    renderResult("");
});


    return {
        renderBoard,
        renderTurn,
        renderResult
    };
})();