let buttons = document.querySelectorAll(".btn");
let reset = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");

let gameActive = true;
let count = 0;
let gameOver = false;


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const resetGame = () => {
    gameActive = true;
    count = 0;
    gameOver = false;
    enableButtons();
}


buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (gameOver || btn.innerText!=="")
            return;
        if (gameActive) {
            btn.innerText = "X";
            btn.style.color = "#b0413e";
            gameActive = false;
        }
        else {
            btn.innerText = "O";
            btn.style.color = "#1b742e";
            gameActive = true;
        }
        btn.disabled = true;
        count++;
        let win = checkWin();

        if (count === 9 && !win) {
            gameDraw();
        }
    });

});


const gameDraw = () => {
    alert("It's a Draw! ☹️");
    gameOver = true;
    disableButtons();
};
const disableButtons = () => {
    for (let btn of buttons) {
        btn.disabled = true;
    }
};

const enableButtons = () => {
    for (let btn of buttons) {
        btn.disabled = false;
        btn.innerText = "";
    }
};
const showWin = (btn) => {
    alert(`Player ${btn} Wins! 😎`);
    gameOver = true;
    disableButtons();
}
const checkWin = () => {
    for (let condition of winningConditions) {
        let a = buttons[condition[0]].innerText;
        let b = buttons[condition[1]].innerText;
        let c = buttons[condition[2]].innerText;
        if (a != "" && b != "" && c != "") {
            if (a === b && b === c) {
                showWin(a);
                return true;
            }
        }
    }
}
newbtn.addEventListener("click", () => {
    if (gameOver) {
        resetGame();
    }
    else {
        alert("Finish the game first!");
    }
});
reset.addEventListener("click", ()=>{
    if(!gameOver){
        resetGame();
    }
    else{
        alert("Click New Game to start again!");
    }
});