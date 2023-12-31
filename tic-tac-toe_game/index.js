const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create a function to intialize the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // UI pr bhi grid ko empty krna padega
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        // one more thing is missing,i.e.,green color ko bhi remove kra do
        // initialize box with css properties again
        box.classList=`box box${index+1}`

    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="0"
    }
    else{
        currentPlayer="X"
    }

    // UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`
}

function checkGameOver(){
    let ans = "";

    winningPosition.forEach((position)=>{
        // ALL 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]]!=="")
            && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){
                // check if winner is X
                if(gameGrid[position[0]] === "X")
                    ans="X";
                else
                    ans="0";
                
                // disable pointer events
                boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                })
                
                // now we know X/O is winner

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    // it means we have a winner
    if(ans !== ""){
        gameInfo.innerText=`Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }
    // when there is no winner or game tied
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box !== "")
            fillCount++;
    });

    // board is filled,game is TIE
    if(fillCount===9){
        gameInfo.innerText="Game Tied"
        newGameBtn.classList.add("active");
    }

}


function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none"
        // swap the turn
        swapTurn();
        // check is someone win
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);
