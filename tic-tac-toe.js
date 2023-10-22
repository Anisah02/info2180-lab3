window.addEventListener('load', function () {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const newGameBtn = document.querySelector('.btn');
    const squares = document.querySelectorAll('#board div');
    let box = Array(9).fill(' ');
    let currentPlayer = 'X';
    let gameRunning = true;
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const PLAYER_X_WON = 'PLAYER_X_WON';
    const PLAYER_O_WON = 'PLAYER_O_WON';
    const TIE = 'TIE';

    function announceResult(result) {
        switch (result) {
            case PLAYER_X_WON:
                status.textContent = 'Congratulations! Player X is the winner!';
                break;
            case PLAYER_O_WON:
                status.textContent = 'Congratulations! Player O is the winner!';
                break;
            case TIE:
                status.textContent = 'It\'s a tie!';
                break;
        }
        status.classList.add('you-won');
    }

    function handleSquareClick(index) {
        if (gameRunning && box[index] === ' ') {
            squares[index].textContent = currentPlayer;
            squares[index].classList.add(currentPlayer);
            box[index] = currentPlayer;

            if (checkForWin() || checkForTie()) {
                gameRunning = false;
            } else {
                switchPlayer();
            }
        }
    }

    function checkForWin() {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (box[a] !== ' ' && box[a] === box[b] && box[a] === box[c]) {
                announceResult(currentPlayer === 'X' ? PLAYER_X_WON : PLAYER_O_WON);
                return true;
            }
        }
        return false;
    }

    function checkForTie() {
        if (!box.includes(' ')) {
            announceResult(TIE);
            return true;
        }
        return false;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    squares.forEach((square, index) => {
        square.addEventListener('click', () => handleSquareClick(index));
        square.classList.add('square');
        square.addEventListener('mouseover', () => square.classList.add('hover'));
        square.addEventListener('mouseout', () => square.classList.remove('hover'));
    });

    newGameBtn.addEventListener('click', newGame);

    function newGame() {
        box = Array(9).fill(' ');
        currentPlayer = 'X';
        gameRunning = true;
        status.textContent = 'Move your mouse over a square and click to play an X or an O.';
        status.classList.remove('you-won');
        squares.forEach((square) => {
            square.textContent = '';
            square.classList.remove('X', 'O');
        });
    }
});
