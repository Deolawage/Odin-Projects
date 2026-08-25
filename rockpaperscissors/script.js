/* Declaring Variable */
let humanScore = 0;
let computerScore = 0;
let gameOver = false;

/*Function for Computer Choice*/
function getComputerChoice (){
    const random = Math.random();



if (random < 0.33) {
    return "rock";
} else if (random < 0.66) {
    return "paper";
} else {
    return "scissors";
}
}
console.log (getComputerChoice());


//Choice-btn

const choiceBtn = document.querySelectorAll(".choice-btn");
 choiceBtn.forEach((button) => {
    button.addEventListener("click", () => {
   
   
         if (gameOver) {
        return;
    }

       const humanChoice = button.dataset.choice
     const result = (playRound(humanChoice, getComputerChoice()));

     if ( result.winner === "human"){
humanScore++;
} else if ( result.winner === "computer"){
computerScore++
} else if( result.winner === "tie"){

}

scoreShow.textContent = result.message;

scoreDisplay.textContent = `Human: ${humanScore} — Computer: ${computerScore}`;


if ( humanScore >= 5){
    gameOver = true;
   scoreDisplay.textContent = "Human Wins" 
} else if ( computerScore >= 5){
    gameOver = true;
    scoreDisplay.textContent = "Computer Wins"
}

    });
    
});


  const scoreShow = document.getElementById("results");

function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();

    
    if (humanChoice === computerChoice) {
        return { message: "It's a tie!", winner: "tie" };
    }
    // Logic to determine the winner
    if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        return { message:`You win! ${humanChoice} beats ${computerChoice}`, winner:"human" };
    } else {
        return { message: `You lose! ${computerChoice} beats ${humanChoice}`, winner:"computer" };
    }
}
const scoreDisplay = document.getElementById("show-board");


