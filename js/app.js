class Game {
    constructor() {
        this.gameActive = true;
        this.currentPlayer = "X";
        this.gameState = [
            "", "", "",
            "", "", "",
            "", "", ""
        ]
        this.winningCondiions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [0, 3, 6]
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
        this.handleCellClicked()
    }

    // method to handle clicked cell
    handleCellClicked() {
        // grab cell
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const cellIdx = parseInt(cell.getAttribute('data-cell-index'))
            // if the cellIdx is not an empty string OR if game active is false, then the tile will not be played
            if (this.gameState[cellIdx] != '' || !this.gameActive) {
                return;
            } 
            this.handleCellPlayed(cell, cellIdx)
        })
    }
    // method to handle the cell that is played
    handleCellPlayed(cell, index) {
        this.gameState[index] = this.currentPlayer;
        console.log(this.gameState)
        this.currentPlayer == 'X' ? cell.classList.add('red') : cell.classList.add('blue');
        cell.innerText = this.currentPlayer;
    }
}

const action = new Game();
action.init();