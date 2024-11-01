const WIDTH = 10
const HEIGHT = 20

const TETROMINO_SHAPES = {
    I_PIECE: [[null, "cyan", null, null],
              [null, "cyan", null, null],
              [null, "cyan", null, null],
              [null, "cyan", null, null]],
    T_PIECE: [["purple", "purple", "purple"],
              [null, "purple", null],
              [null, null, null],],
    L_PIECE: [[null, null, "orange"],
              ["orange", "orange", "orange"],
              [null, null, null],],
    J_PIECE: [["blue", null, null],
              ["blue", "blue", "blue"],
              [null, null, null],],
    S_PIECE: [[null, "green", "green"],
              ["green", "green", null],
              [null, null, null],],
    Z_PIECE: [["red", "red", null],
              [null, "red", "red"],
              [null, null, null],],
    O_PIECE: [[null, null, null, null],
              [null, "yellow", "yellow", null],
              [null, "yellow", "yellow", null],
              [null, null, null, null]],

}

// Gets a random piece name from TETROMINO_SHAPES
function getRandomPiece() {
    let rand = Math.floor(Math.random() * 7);
    let block_list = Object.keys(TETROMINO_SHAPES);
    let shape = block_list[rand];
    return {
        xPosition: 4,
        yPosition: 0,
        piece: map_tetromino_shapes(shape),
    };
}

function map_tetromino_shapes(shape) {
    return TETROMINO_SHAPES[shape];
}

function rotateMatrixClockwise(matrix) {
    const N = matrix.length;
    let rotated = createEmptyGrid(N);
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            rotated[col][N - row - 1] = matrix[row][col];
        }
    }
    return rotated;
}
function rotateMatrixCounterclockwise(matrix) {
    const N = matrix.length;
    let rotated = createEmptyGrid(N);
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            rotated[N - col - 1][row] = matrix[row][col];
        }
    }
    return rotated;
}

function create2DArray(width, height) {
    let array = new Array(height);
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(width).fill(null);
    }

    return array;
}

const emptyGameState = {
    gameBoard: create2DArray(WIDTH, HEIGHT),
    activeTetromino: getRandomPiece(),
    upcomingTetrominos: [getRandomPiece(), getRandomPiece(), getRandomPiece()],
    score: 0,
    holdPiece: null,
    isGameOver: false,
}

// Creates the game controller

export function createGame(loadedState = emptyGameState) {
    const tetrisGame = {
        gamesState: loadedState,
        /* 
        Move the game forward one time step
        */
        gameTick: function() {
            this.movePieceDown()
            // setInterval(offsetY + 1, 1000)
            // 2. Lock in place if it can't move
            // 3. Clear any lines
            // 4. Get new piece
        },
        getGameState: function() {
            return this.gamesState
        },
        movePieceRight: function() {

        },
        movePieceLeft: function() {

        },
        movePieceDown: function() {
            const cloneGameBoard = JSON.parse(JSON.stringify(this.gamesState.gameBoard))
            const cloneTetromino = JSON.parse(JSON.stringify(this.gamesState.activeTetromino))

            cloneTetromino.yPosition += 1
            if (this.isStatePossible(cloneTetromino)) {
                this.gamesState.activeTetromino = cloneTetromino
            }
        },
        rotateClockwise: function() {

        },
        rotateAnticlockwise: function() {

        },
        instantDrop: function() {

        },
        getNextPiece: function() {

        },
        isStatePossible: function(newTetromino) {
            for (let i = 0; i < newTetromino.piece.length; i++){
                const row = newTetromino.piece[i]
                for (let j = 0; j < row.length; j++){
                    const el = row[j];
                    if (row[j] !== null) {
                        if (newTetromino.yPosition + i > HEIGHT - 1) {
                            return false
                        }
                        else if (newTetromino.xPosition + j> WIDTH -1 ) {
                            return false
                        }
                        else if (newTetromino.xPosition + j < 0) {
                            return false   
                        }
                        if (this.gamesState.gameBoard[newTetromino.yPosition + i][newTetromino.xPosition + j] !== null) {
                            return false
                        }
                    }
                } 
            }
            return true
        },
        lockPiece: function () {
            const cloneGameBoard = JSON.parse(JSON.stringify(this.gamesState.gameBoard))
            const tetromino = this.gamesState.activeTetromino;
            const piece = tetromino.piece;

            for (let i = 0; i < piece.length; i++){
                const row = piece[i]
                for (let j = 0; j < row.length; j++){
                    const el = row[j];
                    if (row[j] !== null) {
                        cloneGameBoard[tetromino.yPosition + i][tetromino.xPosition + j] = row[j]
                    }
                } 
            }

            this.gamesState.gameBoard = cloneGameBoard
        },
        clearLines: function () {

        },
    
    }

    return tetrisGame
}

