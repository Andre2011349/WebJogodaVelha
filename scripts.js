const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winningMessage = document.querySelector("[data-winning-message]")
const restartButton = document.querySelector("[data-restar-button]")
let isCircleTurn;

const   winningCombinations  = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

    ];
const startGame =() => {

    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove("Circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick,{once: true});
        cell.addEventListener("click", handleClick, {once: true});
   };


    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");

};


const endGame = (isDraw) => {
    if(isDraw){
        winningMessageTextElement.innerText = 'Empate!'
    }
    else{
        winningMessageTextElement.innerText = isCircleTurn ? "Sofia Venceu!" : "Miguel Venceu!"
    }
    winningMessage.classList.add("show-winning-message")
}


const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every((index)=>{
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
}

const checkForDraw = () => {
    return [...cellElements].every(cell => {
       return cell.classList.contains('x') || cell.classList.contains('Circle')
    })
}
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
};

const setBoardHoverClass = () => {
    board.classList.remove('Circle');
    board.classList.remove('x');

    if (isCircleTurn) {

        board.classList.add('Circle');

        }
    else {

        board.classList.add('x');

        }
};
function swapTurns() {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();

}


const handleClick = (e) => {

    // colocar a marca x ou circulo
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'Circle' : 'x';
    placeMark(cell, classToAdd); 

  
    //verificar por vitoria
    const isWin = checkForWin(classToAdd);

    //verificar por empate
    const isDraw = checkForDraw();
    if (isWin){
        endGame(false)
    }
    else if (isDraw){
        endGame(true)
    }


   
    
    
    //mudar símbolo
    swapTurns();
};

startGame();
restartButton.addEventListener('click', startGame);
 

