'use strict'

const editGameBoard = function (cellValue, value) {
  $(cellValue).text(value)
}

module.exports = {
  editGameBoard
}
