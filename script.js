function knightMoves(start, end) {
    const board = buildBoard();
    const startIndex = getIndex(board, start);
    const endIndex = getIndex(board, end);
    const bfsInfo = buildSearchArray(board, startIndex);
    const adjacentList = buildAdjacentList(board);
    const queue = [startIndex];

    let current;

    while (queue.length > 0) {
        current = queue.shift();

        for (let i = 0; i < adjacentList[current].length; i++) {
            let currentNeighbor = adjacentList[current][i];
            if (currentNeighbor === endIndex) {
                bfsInfo[currentNeighbor].parent = current;
                let path = [];

                createPath(board, bfsInfo, bfsInfo[currentNeighbor], currentNeighbor, path);
                path.reverse();
                path.unshift(start);
                console.log( `You made it in ${path.length - 1} moves! Your path is as follows:`, path);
                return path;
            } else {
                if (bfsInfo[currentNeighbor].distance === null) {
                    bfsInfo[currentNeighbor].distance = bfsInfo[current].distance + 1;
                    bfsInfo[currentNeighbor].parent = current;
                    queue.push(currentNeighbor);
                }
            }
        }
    }
    return "It is impossible!";
}

function buildBoard() {
    let board = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            board.push([i, j]);
        }
    }
    return board;
}

function getIndex(board, target) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] === target[0] && board[i][1] === target[1]) {
            return i;
        }
    }
}


function buildSearchArray(board, startIndex) {
    let newArray = [];
    for (let i = 0; i < board.length; i++) {
        newArray[i] = {
        distance: null,
        parent: null,
        };
    }
    newArray[startIndex].distance = 0;
    return newArray;
}


function buildAdjacentList(board) {
    let adjacentList = [];
    for (let i = 0; i < board.length; i++) {
    let neighbors = [];
    for (let j = 0; j < 8; j++) {
        let neighbor = findNextMove(j, board[i][0], board[i][1]);
        if (containsSpot(neighbor)) {
        neighbors.push(getIndex(board, neighbor));
        }
    }
    adjacentList[i] = neighbors;
}
    return adjacentList;
}

function findNextMove(index, x, y) {
    const moves = [
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
        [-2, -1],
        [-1, -2],
        [1, -2],
        [2, -1],
    ];
    return [x + moves[index][0], y + moves[index][1]];
}

function containsSpot(target) {
    return target[0] >= 0 && target[0] < 8 && target[1] >= 0 && target[1] < 8;
}

function createPath(board, infoArray, item, index, newArray) {
    if (item.parent !== null) {
        newArray.push(board[index]);
        createPath(board, infoArray, infoArray[item.parent], item.parent, newArray);
    }
}

const startGame = knightMoves([2, 3], [3, 3]);
console.log(startGame);
