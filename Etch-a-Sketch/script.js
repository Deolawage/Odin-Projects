
//grid section

let size = 16;
createGrid(16);



function checkNumber(number) {
    if (number >= 1 && number <= 100) {
        console.log("Valid number!");
        return true;
    }

    console.log("Invalid number!");
    return false;
};


const btn = document.getElementById("btn");
btn.addEventListener( "click", (e) =>{
    
    const reset = prompt("Reset Grid, input value");
    
    const number = Number(reset);

    if (checkNumber(number)) {
const container = document.getElementById("container-grid");
container.innerHTML = "";

createGrid(number);


    } else{
 alert("Please eneter a number between 1 and 100");       
    }

});






//Create createGrid
function createGrid(gridSize){
const container = document.getElementById("container-grid");


for ( let i = 0; i < gridSize * gridSize; i++){
    const square = document.createElement("div");//Add div to page
    square.classList.add("grid-square");
    square.timesHovered = 0;//Create Darkening effect.
square.addEventListener( "mouseenter", () => {

    if (square.timesHovered === 0) {//Create Darkening effect each hovers
     square.style.backgroundColor = getRandomColor();//Get randomColor each Hover
    }

    square.timesHovered++;
    square.style.opacity = 1 - (square.timesHovered * 0.1);//Get opacity level to reduce by 10%
     
})

    container.appendChild(square);
}
};

//getRandomColorValue
function getRandomColorValue() {
    return Math.floor(Math.random() * 256);   
}

function getRandomColor() {
    const r = getRandomColorValue();
    const g = getRandomColorValue();
    const b = getRandomColorValue();
    return `rgb(${r}, ${g}, ${b})`;
}
