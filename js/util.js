'use strict'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function getEmptyPos() {
  const emptyPoss = []
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (!gBoard[i][j].isMine && !gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
        emptyPoss.push({ i, j })
      }
    }
  }

  const randIdx = getRandomInt(0, emptyPoss.length)
  return emptyPoss[randIdx]
}

function getSafeClickPos() {
  const emptyPoss = []
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      const currCell = gBoard[i][j]
      if (!currCell.isMine && !currCell.isShown) {
        emptyPoss.push({ i, j })
      }
    }
  }

  const randIdx = getRandomInt(0, emptyPoss.length)
  return emptyPoss[randIdx]
}
