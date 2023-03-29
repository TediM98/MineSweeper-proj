'use strict'

const MINE_IMG = '<img src="img/mine.png">'

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
var gBoard

function onInit() {
    gBoard = buildBoard()
    gBoard[1][2].isMine = true
    gBoard[1][1].isMine = true
    console.log(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard, ".board-container")

}

function buildBoard() {
    const board = []
    for (var i = 0; i < 4; i++) {
        board.push([])
        for (var j = 0; j < 4; j++) {
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
                strHTML += cell.minesAroundCount
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
    console.log('i,j', i, j)
}

function onCellMarked(elCell) {
}

function checkGameOver() {

}

function expandShown(board, elCell,
    i, j) {

}