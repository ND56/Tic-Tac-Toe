'use strict'

const editGameBoard = function (cellValue, value) {
  $(cellValue).text(value)
}

const editTurnTracker = function (value) {
  $('#turn-tracker').text('Your turn, player ' + value + '!')
}

module.exports = {
  editGameBoard,
  editTurnTracker
}
