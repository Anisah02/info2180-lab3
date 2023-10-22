window.onload = function(){
    const board = document.getElementById("board");
    let status = document.getElementById('status');
    const game = document.querySelector('.game');
    const newGameBtn = document.querySelector(".btn");
    let squares = document.querySelectorAll("#board div");
    let box = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    let currentPlayer = "X";
    let gameRunning = true;
    newGameBtn.addEventListener("click", newGame);

    
    const updateBox =  (index) => {
        box[index] = currentPlayer;
    }

    const switchPlayer = () => {
        if (currentPlayer == "X"){
            currentPlayer = "O"; 
        }
        else{
            currentPlayer = "X";
        }
    }

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    function showResults() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = box[winCondition[0]];
            const b = box[winCondition[1]];
            const c = box[winCondition[2]];
            if (a === ' ' || b === ' ' || c === ' ') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            gameRunning = false;
            return;
        }

    if (!box.includes(' '))
          announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                status.innerHTML = 'Congratulations! X is the Winner!';
                break;
            case PLAYERX_WON:
                status.innerHTML = "Congratulations! O is the Winner!";
                break;
             case TIE:
                 status.innerText = 'Tie!';
        }
        status.setAttribute("class","you-won");
    };


    const clicked = (squares, index) => {
        if(gameRunning && squares.innerHTML == "") {
            squares.innerHTML = currentPlayer;
            squares.classList.add(currentPlayer);
            updateBox(index);
            switchPlayer();
            showResults();
        }
    }
    
    
    squares.forEach( (squares, index) => {
        
        squares.addEventListener('click', () => clicked(squares, index));
         
    });

    for (let s in squares){
    
        squares[s].classList.add("square");
        squares[s].onmouseover = function(){squares[s].classList.toggle('hover', true)}
        squares[s].onmouseout = function(){squares[s].classList.toggle('hover', false)}
        
    }

    
    function newGame() {
        box = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        gameRunning = true;
        status.innerText = "Move your mouse over a square and click to play an X or an O.";
        status.setAttribute("class","status");
        if (currentPlayer === 'O') {
            switchPlayer();
        }
        squares.forEach(squares => {
            squares.innerText = "";
            squares.classList.remove('X');
            squares.classList.remove('O');
        });
    }


    

}
