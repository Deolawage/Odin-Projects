
/* Declaring Variable */
let humanScore = 0;
let computerScore = 0;

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


//Function for Human Choice

function getHumanChoice() {
    const userchoice = prompt("Enter your choice (rock, paper, or scissors): score++").toLowerCase();
    return userchoice;
}
console.log(getHumanChoice());



function getHumanChoice() {
    const userchoice = prompt("Enter your choice (rock, paper, or scissors):").toLowerCase();
    return userchoice;
}
console.log(getHumanChoice());



function getHumanChoice() {
    const userchoice = prompt("Enter your choice (rock, paper, or scissors):").toLowerCase();
    return userchoice;
}
console.log(getHumanChoice());


function getHumanChoice() {
    const userchoice = prompt("Enter your choice (rock, paper, or scissors):").toLowerCase();
    return userchoice;
}
console.log(getHumanChoice());


function getHumanChoice() {
    const userchoice = prompt("Enter your choice (rock, paper, or scissors):").toLowerCase();
    return userchoice;
}
console.log(getHumanChoice());



//playGame Section

function playGame(){
  function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();

    

    if (humanChoice === computerChoice) {
        return "It's a tie!";
    }
    // Logic to determine the winner
    if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        return `You win! ${humanChoice} beats ${computerChoice}`;
    } else {
        return `You lose! ${computerChoice} beats ${humanChoice}`;
    }
}


console.log(playRound(getHumanChoice(), getComputerChoice()));

}
 