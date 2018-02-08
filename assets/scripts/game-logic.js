'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// game board
const gameBoard = ['', '', '', '', '', '', '', '', '']

// add to board function
// I don't have a check for if the space is already assigned because I plan
// to make it so that assignment changes the properties of a space so a user
// can no longer click the space.
// I don't think it's a problem that if all the spaces are filled the modulus
// be zero (0 % 2 = 0) because after the last spot is selected, my checkForWin
// function should end the game.
const declareWinner = function (value) {
  console.log('Congratulations ' + value + ', you won!')
}

const checkForWin = function (array) {
  if (array[0] !== '' && array[0] === array[3] && array[0] === array[6]) {
    declareWinner(array[0])
  } else if (array[0] !== '' && array[0] === array[4] && array[0] === array[8]) {
    declareWinner(array[0])
  } else if (array[0] !== '' && array[0] === array[1] && array[0] === array[2]) {
    declareWinner(array[0])
  } else if (array[1] !== '' && array[1] === array[4] && array[1] === array[7]) {
    declareWinner(array[1])
  } else if (array[2] !== '' && array[2] === array[5] && array[2] === array[8]) {
    declareWinner(array[2])
  } else if (array[3] !== '' && array[3] === array[4] && array[3] === array[5]) {
    declareWinner(array[3])
  } else if (array[6] !== '' && array[6] === array[7] && array[6] === array[8]) {
    declareWinner(array[6])
  } else if (array[6] !== '' && array[6] === array[4] && array[6] === array[2]) {
    declareWinner(array[6])
  } else if (array.every(function (currentValue) {
    return currentValue !== ''
  })) {
    console.log('It\'s a tie! You\'re both just too good!')
  }
  // if no condition met, nothing happens because game continues
}

const selectSpace = function (event) {
  event.preventDefault()
  const cellValue = event.target.parentElement
  const cellId = event.target.attributes.id
  const cellIdValue = $(cellId).val()
  // console.log(cellIdValue)
  // $(cellValue).text('X')
  let emptySpaces = 0
  gameBoard.forEach(function (arrElement) {
    if (arrElement === '') {
      emptySpaces += 1
    }
  })
  if (emptySpaces % 2 === 1) {
    // now assign the selected space the value "x"
    gameBoard[cellIdValue] = 'X'
    $(cellValue).text('X')
  } else if (emptySpaces % 2 === 0) {
    gameBoard[cellIdValue] = 'O'
    $(cellValue).text('O')
  }
  console.log(gameBoard) // for testing purposes
  checkForWin(gameBoard)
}

module.exports = {
  gameBoard,
  selectSpace
}
