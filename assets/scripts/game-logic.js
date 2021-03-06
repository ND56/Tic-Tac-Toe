'use strict'

const ui = require('./ui')
const store = require('./store')

const determineValue = function (board, cellValue, cellIdValue) {
  let emptySpaces = 0
  board.forEach(function (arrElement) {
    if (arrElement === '') {
      emptySpaces += 1
    }
  })
  if (emptySpaces % 2 === 1) {
    board[cellIdValue] = 'X'
    ui.editGameBoard(cellValue, 'X')
    ui.editTurnTracker('player O')
  } else if (emptySpaces % 2 === 0) {
    board[cellIdValue] = 'O'
    ui.editGameBoard(cellValue, 'O')
    ui.editTurnTracker(store.user.email)
  }
}

const declareWinner = function (value) {
  store.game.over = true
  if (value === 'X') {
    $('#winner-modal-content').text('Congratulations, ' + store.user.email + ', you win!')
  } else {
    $('#winner-modal-content').text('Congratulations, Player O, you win! Better luck next time, ' + store.user.email + '!')
  }
  $('#winner-modal').modal('show')
  $('.game-board').hide()
  $('.user-profile-page').show()
}

const declareTie = function () {
  store.game.over = true
  $('#winner-modal-content').text('It\'s a tie! You\'re both just too good!')
  $('#winner-modal').modal('show')
  $('.game-board').hide()
  $('.user-profile-page').show()
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
    declareTie()
  }
}

module.exports = {
  determineValue,
  checkForWin
}
