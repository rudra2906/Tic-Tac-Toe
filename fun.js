const gameInfo = document.querySelector(".current-player");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPosition;
let gameGrid;

const winningPosition= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Create a function to initilize a game
function initGame()
{
    currentPosition = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>
    {
        box.innerText="";
        boxes[index].style.pointerEvents = 'all';
        box.classList = `box box${index+1}` ;
    })
    
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPosition}`;
    
}
initGame();

function checkWinGame()
{
    let winner = "";
    winningPosition.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        &&  (gameGrid[position[0]] === gameGrid[position[1]]) &&  (gameGrid[position[1]] === gameGrid[position[2]])) 
        {
            if(gameGrid[position[0]] === "X")
            {
                winner = "X";
            }
            else
            {
                winner= "0";
            }

            boxes.forEach((box)=>
            {
                box.style.pointerEvents = 'none';
            })
            // now apply green background
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")

        }
    });

    // it means we have a winner
    if(winner!=="")
    {
        gameInfo.innerText = `Winner Player - ${winner} `;
        newGameBtn.classList.add("active");
    }

    let count = 0;
    gameGrid.forEach((box)=>{
        if(box !== "")
        {
            count++;
        }
    })

    // it is tie
    if(count === 9)
    {
        gameInfo.innerText = `Game Tied!`;
        newGameBtn.classList.add("active");
    }
}

function swapTurn()
{
    if(currentPosition === "X")
    {
        currentPosition = "0";
    }
    else
    {
        currentPosition = "X";
    }
    // UI update
    gameInfo.innerText = `Current Player - ${currentPosition}`;
}

function handleClick(index)
{
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currentPosition;
        gameGrid[index] = currentPosition;
        // currentPosition = "0";
        boxes[index].style.pointerEvents = 'none';
        // gameInfo.innerText = `Current Player - ${currentPosition}`;
        // swap function
        swapTurn();
        // check koi jeet to nahi
        checkWinGame();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame)