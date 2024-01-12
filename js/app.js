class Game {
    constructor() {
        this.gameRestartBtn = document.getElementById('gameRestart');
        this.submitBtn = document.getElementById('submitBtn');
        this.gameStatus = document.getElementById('gameStatus');
        this.gameActive = true;
        this.currentPlayer = "X";
        this.xWins = document.getElementById('xWins');
        this.oWins = document.getElementById('oWins');
        this.playerOne = document.getElementById('playerOne');
        this.playerTwo = document.getElementById('playerTwo');

        this.winCount = {
            x: 0,
            o: 0
        }

        this.gameState = [
            "", "", "",
            "", "", "",
            "", "", ""
        ]
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6]
        ]
        this.players = {
            player1: "Player 1",
            player2: "Player 2"
        }
    }

    // Initializer
    init() {
        this.playerOne.innerText = this.players.player1;
        this.playerTwo.innerText = this.players.player2;
        this.getPlayerNames();
        this.currentPlayerTurn();
        this.handleCellClicked()
        this.gameRestartBtn.addEventListener("click", ()=> {
            this.restartGame()
        })
    }

    // messages
    currentPlayerTurn() {
        const message = `It's ${this.currentPlayer}'s turn`;
        return this.gameStatus.innerText = message;
    }

    drawMessage() {
        const message = `Game ended in a draw`;
        return this.gameStatus.innerText = message;
    }

    winMessage() {
        const message = `Player ${this.currentPlayer} has won!`;
        return this.gameStatus.innerText = message;
    }

    // method to handle clicked cell
    handleCellClicked() {
        // grab cell
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const cellIdx = parseInt(cell.getAttribute('data-cell-index'))
            // if the cellIdx is not an empty string OR if game active is false, then the square will not be played
            cell.addEventListener('click', ()=> { 
                if (this.gameState[cellIdx] != '' || !this.gameActive) {
                    return;
                } 
                this.handleCellPlayed(cell, cellIdx)
                this.resultValidation()
            })
        })
    }
    // method to handle the cell that is played
    handleCellPlayed(cell, index) {
        this.gameState[index] = this.currentPlayer;
        this.currentPlayer == 'X' ? cell.classList.add('red') : cell.classList.add('blue');
        cell.innerText = this.currentPlayer;
    }

    // method to check for a winning condition
    resultValidation() {
        let gameWon = false;

        for (let i = 0; i <= 7; i++) {
            const win = this.winningConditions[i];
            let a = this.gameState[win[0]];
            let b = this.gameState[win[1]];
            let c = this.gameState[win[2]];

            if (a == '' || b == '' || c == '') {
                continue;
            }

            if (a == b && b == c) {
                gameWon = true;
                break;
            }
        }

        if (gameWon) {
            const tallyMark = 'x';
            this.winMessage();
            const winner = this.currentPlayer;

            if (winner == 'X') {
                this.winCount.x = this.winCount.x + 1;
                this.xWins.innerHTML += `<span class="tally"> ${tallyMark}</span>`
            } else {
                this.winCount.o = this.winCount.o + 1;
                this.oWins.innerHTML += `<span class="tally"> ${tallyMark}</span>`
            }

            this.checkWinCount()
            this.gameActive = false;
            return;
        }

        const roundDraw = !this.gameState.includes('');
        if (roundDraw) {
            this.drawMessage();
            this.gameActive = false;
            return;
        }

        // method to change player
        this.playerChange();
    }

    playerChange() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.currentPlayerTurn();
    }

    restartGame() {
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.gameState = [
            "", "", "",
            "", "", "",
            "", "", ""
        ];
        this.currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('blue');
        })
    }

    getPlayerNames() {
        const submitBtn = this.submitBtn;
        const playerOne = this.playerOne;
        const playerTwo = this.playerTwo;

        submitBtn.addEventListener("click", (e)=> {
            e.preventDefault();
            const player1Name = document.getElementById('player1').value;
            const player2Name = document.getElementById('player2').value;

            this.players.player1 = player1Name;
            this.players.player2 = player2Name;

            playerOne.innerText = this.players.player1;
            playerTwo.innerText = this.players.player2;
        })
    }

    checkWinCount() {
        let xWinTotal = this.winCount.x;
        let oWinTotal = this.winCount.o;

        if (xWinTotal == 3) {
            this.gameStatus.innerText = `${this.players.player1} is the SUPREME VICTOR!`;
            document.getElementById('xWins').style.backgroundImage="url(media/confetti.gif)"; 
            this.gameReload();
        } else if (oWinTotal == 3) {
            this.gameStatus.innerText = `${this.players.player2} is the SUPREME VICTOR!`;
            document.getElementById('oWins').style.backgroundImage="url(media/confetti.gif)"; 
            this.gameReload();
        } else {
            return;
        }

        this.gameActive = false;
    }

    gameReload() {
        setTimeout(() => {
            this.restartGame()
            this.xWins.innerHTML = "";
            this.oWins.innerHTML = "";
            this.playerOne.innerText = "Player 1";
            this.playerTwo.innerText = "Player 2";
            this.winCount.x = 0;
            this.winCount.o = 0;
            document.getElementById('player1').value = '';
            document.getElementById('player2').value = '';
            document.getElementById('xWins').style.backgroundImage="none"; 
            document.getElementById('oWins').style.backgroundImage="none"; 
        }, 3000);
    }
}

const action = new Game();
action.init();