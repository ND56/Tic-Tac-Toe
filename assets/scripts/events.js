'use strict'

const gameLogic = require('./game-logic')

const gameBoard = ['', '', '', '', '', '', '', '', '']

const selectSpace = function (event) {
  event.preventDefault()
  const cellValue = event.target.parentElement
  const cellId = event.target.attributes.id
  const cellIdValue = $(cellId).val()
  gameLogic.determineValue(gameBoard, cellValue, cellIdValue)
  console.log(gameBoard) // for testing purposes
  gameLogic.checkForWin(gameBoard)
}

module.exports = {
  gameBoard,
  selectSpace
}
