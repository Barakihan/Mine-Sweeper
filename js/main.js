'use strict';
// console.log('hallo');
var EMPTY = '';
var MINE = '💣';
var FLAG = '🚩'

var gGame;
var gBoard = [];
var gCell;
var gSize;
// var gLevel = { SIZE: 4, MINES: 2};


// var gFirstClick = false;

function init() {
    var restartBtn = document.querySelector('button');
    restartBtn.innerHTML = '😊'
    console.log('starter');

    gBoard = createBoard();
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        isFirstClick: false,
    }
    renderBoard(gBoard);
}

function createBoard() {
    var board = [];
    var size = 4;
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            // var currCell = board[i][j]
            // neighborsAroundCount: [],
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                position: {
                    i: i,
                    j: j
                }
            }
        }
    }
    board[1][1].isShown = true;
    board[1][1].isMine = true;
    board[2][2].isShown = true;
    board[2][2].isMine = true;
    console.table(board)
    return board;
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            // board[i][j] = gCell.minesAroundCount;
            // board[i][j] = gCell.data-position;
            // board[i][j] = 'cell cell' + i + '-' + j;
            var className = 'cell';
            var posI = board[i][j].position.i;
            var posJ = board[i][j].position.j;
            strHtml +=
                `<td onclick="cellClicked(this, ${posI}, ${posJ})"
                class="${className}"></td>`;
            // ${board[i][j]}
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function cellClicked(elCell, i, j) {
    if (gGame.isOn === false) return;
    gBoard[i][j].isShown = true;
    var negsCount = gBoard[i][j].minesAroundCount;
    if (gBoard[i][j].isMine) {
        elCell.innerText = MINE;
        gameOver();
    } else {
        elCell.innerText = negsCount;
    }

}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        for (var j = 0; j < board[0].length; j++) {
            // var cell = row[j];
            countNegsAround(board, row, col);
            var currCell = board[i][j];
            if (currCell.isMine === true) {
                gBoard[i][j].minesAroundCount++;
                gBoard[i][j].isShown = true;
            }
            var neighbor = board[i][j];
            board[row][col].neighborsAroundCount.push(neighbor);
        }
    }
}

function countNegsAround(mat, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat[0].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (mat[i][j] === MINE) count++;
        }
    }
    return count;
}

function gameOver() {
    var restartBtn = document.querySelector('button');
    restartBtn.innerHTML = '😈';
    gGame.isOn = false;
}

function restart() {
    init();

}

// function changeDifficult(sizeNum) {
//     size = sizeNum;
//     gNums = createArray();
//     renderBoard();

// }

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function timer() {
    //     if (status == 1) {
    //        setTimeout (function(){

    //            time++;
    //            var min = Math.floor(time/100/60);
    //            var sec = Math.floor(time/100);
    //            var mSec = time % 100;

    //            if (min < 10) {
    //                min = "0" + min;
    //            }
    //            if (sec >= 60) {
    //                sec = sec % 60;
    //            }
    //            if (sec < 10) {
    //                sec = "0" + sec;
    //            }
    //            document.querySelector('.currentGameTime').innerHTML = min + ":" + sec + ":" + mSec;
    //             timer(); 
    //             console.log("time runing");

    //        }
    //        , 10);
    //     }

    // }


