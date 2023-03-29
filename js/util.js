'use strict'

/*******************************/
/*Matrix methods*/
/*******************************/

/*********************/
/*Create*/
/*********************/
function createMat(ROWS, COLS) {
  const mat = []
  for (var i = 0; i < ROWS; i++) {
    const row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}

function createRandomNumsMat(ROWS, COLS) {
  const nums = getRandomOrderNumbersArray(ROWS * COLS)
  const mat = []
  for (var i = 0; i < ROWS; i++) {
    const row = []
    for (var j = 0; j < COLS; j++) {
      row.push(nums[i * COLS + j])
    }
    mat.push(row)
  }
  return mat
}

//Get string and matrix
//Put the string in the matrix in random places for AMOUNT times

//putStringAmountTimesInMat
//putRandomNumberOfStringInMat
function putStringAmountTimesInMat(MAT, STRING, AMOUNT) {
  if (AMOUNT > MAT.length * MAT[0].length) return
  for (var i = 0; i < AMOUNT; i++) {
    var row = getRandomInt(0, MAT.length)
    var col = getRandomInt(0, MAT[0].length)
    if (MAT[row][col] === STRING) {
      i--
    } else {
      MAT[row][col] = STRING
    }
  }
}

/*********************/
/*Find*/
/*********************/

function getAmountOfNeighboursContaining(BOARD, ROW, COL, ITEM) {
  var amount = 0
  for (var i = ROW - 1; i <= ROW + 1; i++) {
    if (i < 0 || i > BOARD.length - 1) continue
    for (var j = COL - 1; j <= COL + 1; j++) {
      if (j < 0 || j > BOARD[i].length - 1 || (i === ROW && j === COL)) continue
      if (BOARD[i][j] === ITEM) amount++
    }
  }
  return amount
}

function countNegsAround(rowIdx, colIdx) {
  var seatCount = 0
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= gCinema.length) continue
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i === rowIdx && j === colIdx) continue
      if (j < 0 || j >= gCinema[0].length) continue
      var currCell = gCinema[i][j]
      if (currCell.isSeat && !currCell.isBooked) seatCount++
    }
  }
  return seatCount
}

function getAmountOfCellsContaining(BOARD, ITEM) {
  var amount = 0
  for (var i = 0; i < BOARD.length; i++) {
    for (var j = 0; j < BOARD[i].length; j++) {
      if (BOARD[i][j] === ITEM) amount++
    }
  }
  return amount
}

/*******************************/
/*Random*/
/*******************************/

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getRandomOrderNumbersArray(MAX) {
  const nums = getArrayWithAscNums(MAX)
  var res = []
  for (var i = 0; i < MAX; i++) {
    res[i] = drawNum(nums)
  }
  return res
}

function getArrayWithAscNums(MAX) {
  var numbers = []
  for (var i = 0; i < MAX; i++) {
    numbers[i] = i + 1
  }
  return numbers
}

/*******************************/
/*Render*/
/*******************************/

function renderBoard(mat, selector) {
  var strHTML = '<table><tbody>'
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j]
      const className = `cell cell-${i}-${j}`

      strHTML += `<td class="${className}">${cell}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

function renderBoardByObjProperty(mat, selector, property) {
  var strHTML = '<table><tbody>'
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j][property]
      const className = `cell cell-${i}-${j}`

      strHTML += `<td class="${className}">${cell}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value
}
/*******************************/
/*Misc*/
/*******************************/

function drawNum(NUMS) {
  return NUMS.splice(getRandomInt(0, NUMS.length), 1)[0]
}


// Returns the class name for a specific cell
function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}

function playSound() {
  const sound = new Audio('sound/sound.mp4')
  sound.play()
}


function showModal() {
  const elModal = document.querySelector('.modal')
  elModal.classList.remove('hide')
}

function hideModal() {
  const elModal = document.querySelector('.modal')
  elModal.classList.add('hide')
}
//Random spot
function findEmptyPosRandom() {
  const emptyLocations = []
  for (var i = 0; i < BOARD_SIZE; i++) {
    for (var j = 0; j < BOARD_SIZE; j++) {
      const cell = gBoard[i][j]
      if (!cell) {
        const pos = { i, j }
        emptyLocations.push(pos)
      }
    }
  }
  const randIdx = getRandomInt(0, emptyLocations.length)
  return emptyLocations[randIdx]

}
// The first it finds
function findEmptyPos() {
  for (var i = 0; i < BOARD_SIZE; i++) {
    for (var j = 0; j < BOARD_SIZE; j++) {
      const cell = gBoard[i][j]
      if (!cell) {
        // const pos = { i: i, j: j }
        const pos = { i, j }
        return pos
      }
    }
  }
}