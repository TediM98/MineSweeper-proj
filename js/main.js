'use strict'
const MINE_IMG = '<img src="img/mine.png">'
const RESTART_NORMAL = '😃'
// const RESTART_LOSE = image.png


var gBoard
var gLives = 3

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
function onInit() {
    gBoard = buildBoard()
    renderBoard(gBoard, ".board-container")
}

function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: true
            }
        }
    }
    return board
}

function renderBoard(board, selector) {
    var strHTML = '<table><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`
            strHTML += `<td  onclick="onCellClicked(this,${i}, ${j})" class="${className}">`
            if (!cell.isMine) {
                strHTML += ''
            } else {
                strHTML += MINE_IMG
            }
            strHTML += `</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}



function setMinesNegsCount(board) {
    var minesAroundCount = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            const currCell = board[i][j]
            // console.log('currCell', currCell)
            if (!currCell.isMine) {
                const negsAround = countNegsAround(i, j)
                currCell.minesAroundCount = negsAround
            } else {
                console.log('null', null)
            }
        }
    }
}


function countNegsAround(rowIdx, colIdx) {
    var NegsCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[0].length) continue
            var currCell = gBoard[i][j]
            if (currCell.isMine) NegsCount++
        }
    }
    return NegsCount
}


function onCellClicked(elCell, i, j) {
    gBoard[i][j].isShown = true
    if (gGame.shownCount === 1) {
        createRandomMines(i, j)
        setMinesNegsCount(gBoard)
    }

    if (!gBoard[i][j].isMine) {
        elCell.innerHTML = gBoard[i][j].minesAroundCount
    }
    gGame.shownCount++

}

function onCellMarked(elCell) {
}

function checkGameOver() {

}

function expandShown(board, elCell,
    i, j) {

}

function createRandomMines() {
    for (var i = 0; i < gLevel.MINES; i++) {
        const idxI = getRandomInt(0, gLevel.SIZE)
        const idxJ = getRandomInt(0, gLevel.SIZE)
        var location = { i: idxI, j: idxJ }
        if (!gBoard.isShown) {
            gBoard[idxI][idxJ].isMine = true
            renderCell(location, MINE_IMG)

        }

    }
}



function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getLevel(boardSize) {
    switch (boardSize) {
        case 4:
            gLevel.SIZE = boardSize
            gLevel.MINES = 2
            break;
        case 8:
            gLevel.SIZE = boardSize
            gLevel.MINES = 14
            break;
        case 12:
            gLevel.SIZE = boardSize
            gLevel.MINES = 32
    }
    onInit()
}