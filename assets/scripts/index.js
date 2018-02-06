'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// game board
const gameBoard = ['', '', '', '', '', '', '', '', '']

// add to board
const selectSpace = function (paramForGameBoard) {
  // when user first selects a space, the space changes to X
  // if no value is "X" or "Y", first value is X
  // the values alternate from O to X thereafter
  let emptySpaces = 0
  paramForGameBoard.forEach(function (paramForArrayElement) {
    if (paramForArrayElement = '') {
      emptySpaces += 1
    }
  })
  if (emptySpaces = //check to see if odd)





  // you cannot choose already occupied spots

  // execute checkForWin function
}
