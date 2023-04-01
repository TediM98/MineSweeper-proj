'use strict'
const MINE_IMG = '<img src="img/mine.png">'
const RESTART_NORMAL = '😃'
const RESTART_LOSE = '😒'
const MARK = '🚩'

var gIsDarkMode = false
var gBoard
var gSafeClick = 3
var gLives = 3
var gMarkedMine = 0
var gTimerIntervalId
var gIsHint = false
var gGame

var gLevel = {
    SIZE: 4,
    MINES: 2
}


function onInit() {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    const elSpan = document.querySelector('.livesLeft')
    elSpan.innerHTML = gLives + ` Lives Left`
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
                isMarked: false
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
            strHTML += `<td oncontextmenu="onCellMarked(event,this, ${i}, ${j})" onclick="onCellClicked(this,${i}, ${j})" class="${className}">`

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
            if (!currCell.isShown) {
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
    checkGameOver()
    const currCell = gBoard[i][j]
    if (!gGame.isOn) return

    if (currCell.isMine) {
        stopTimer()
        gLives--
        elCell.innerHTML = MINE_IMG
        currCell.isShown = true

        if (!gLives) {
            var elRestartBtn = document.querySelector('.reset-btn')
            const elSpan = document.querySelector('.livesLeft')
            elRestartBtn.innerHTML = RESTART_LOSE
            elSpan.innerHTML = ` GAME OVER`
        }
        elCell.style.backgroundColor = 'red'
        gGame.isOn = false
    }

    if (gGame.shownCount === 0) {
        startTimer()
        createRandomMines()
        setMinesNegsCount(gBoard)
    }

    if (!currCell.isMine && !currCell.isShown) {
        if (currCell.minesAroundCount) {
            elCell.innerHTML = gBoard[i][j].minesAroundCount
            currCell.isShown = true
            gGame.shownCount++
        } else {
            expandShown(gBoard, elCell, i, j)
            gGame.shownCount++
            currCell.isShown = true
        }
    }

    if (!currCell.minesAroundCount) {
        expandShown(gBoard, elCell, i, j)
    }

    if (currCell.isShown) {
        elCell.classList.add('clicked')
    }
    checkGameOver()
}


function onCellMarked(ev, elCell, i, j) {
    ev.preventDefault()
    if (gBoard[i][j].isShown) return
    if (elCell.innerText === MARK) {
        elCell.innerText = ' '
        gGame.markedCount--
        gBoard[i][j].isMarked = false
    } else {
        elCell.innerText = MARK
        gGame.markedCount++
        gBoard[i][j].isMarked = true
    }
    if (gBoard[i][j].isMine && gBoard[i][j].isMarked) gMarkedMine++
    if (gBoard[i][j].isMine && !gBoard[i][j].isMarked) gMarkedMine--
    if (gMarkedMine === gLevel.MINES) checkGameOver()
}


function checkGameOver() {
    if (gGame.markedCount === gMarkedMine && gGame.shownCount === (gLevel.SIZE ** 2 - gMarkedMine)) {
        stopTimer()
        const elRestartBtn = document.querySelector('.reset-btn')
        elRestartBtn.innerText = '😎'
        alert('YOU WIN!')
    }
}


function expandShown(board, elCell, idxI, idxJ) {
    for (var i = idxI - 1; i <= idxI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = idxJ - 1; j <= idxJ + 1; j++) {
            const currCell = gBoard[i][j]
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            if (i === idxI && j === idxJ) continue
            if (j < 0 || j >= board[0].length) continue
            if (!currCell.isShown && !gBoard.isMine) {
                elCell.classList.add('clicked')
                currCell.isShown = true
                gGame.shownCount++
            }
        }
    }

}


function createRandomMines() {
    for (var i = 0; i < gLevel.MINES; i++) {
        var location = getEmptyPos()
        console.log('location', location)
        gBoard[location.i][location.j].isMine = true
    }
}




function renderCell(location, value) {
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
    resetTimer()
    onInit()
}

function restartGame() {
    gSafeClick = 3
    const elUsesLeft = document.querySelector('.SafeBtn span')
    elUsesLeft.innerHTML = `${gSafeClick} clicks available`
    resetTimer()
    gMarkedMine = 0
    if (!gLives) gLives = 3
    var elRestartBtn = document.querySelector('.reset-btn')
    elRestartBtn.innerHTML = RESTART_NORMAL
    onInit()
}


function darkMode() {
    const elBackGroundColor = document.querySelector('body')
    if (!gIsDarkMode) {
        elBackGroundColor.style.backgroundColor = 'black'
    } else {
        elBackGroundColor.style.backgroundColor = 'lightblue'
    }
    gIsDarkMode = !gIsDarkMode
}

function useSafe() {
    if (gSafeClick) {
        gSafeClick--
        const elUsesLeft = document.querySelector('.SafeBtn span')
        elUsesLeft.innerHTML = `${gSafeClick} clicks available`
        const safePos = getSafeClickPos()
        const elSafePos = document.querySelector(`.cell-${safePos.i}-${safePos.j}`)
        elSafePos.style.backgroundColor = 'lightgreen'
        setTimeout(() => {
            elSafePos.style.backgroundColor = '#c0c0c0'
        }, 2000)
    }
}

function useHint(elHint) {
    gIsHint = true
    const elHintOn = document.querySelector('.bulbOn')
    elHint.classList.add('hide')
    elHintOn.classList.remove('hide')
}