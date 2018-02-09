'use strict'

const gameLogic = require('./game-logic')
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const gameBoard = ['', '', '', '', '', '', '', '', '']

const createNewGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  // // reset the Board
  gameBoard.forEach(function (element, index, arr) {
    arr[index] = ''
  })
  // reset the ui
  $('.game-cell').text('')
  $('#rotating-turn-tracker').hide()
  $('#first-turn-tracker').show()
  // send api request for new board
  console.log(gameBoard)
  api.newGame(data)
    .then(ui.onCreateNewGameSuccess)
}

const selectSpace = function (event) {
  event.preventDefault()
  const cellValue = event.target
  // Was previously event.target.parentElement
  console.log(event)
  const cellId = event.target.attributes.id
  const cellIdValue = $(cellId).val()
  // the above 2 are the same as when I had buttons.
  // I'm surprised they still work.
  gameLogic.determineValue(gameBoard, cellValue, cellIdValue)
  console.log(gameBoard) // for testing purposes
  gameLogic.checkForWin(gameBoard)
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.create(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onEditPassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.editPassword(data)
    .then(ui.onEditPasswordSuccess)
    .catch(ui.onEditPasswordFailure)
}

const onLogOut = function (event) {
  event.preventDefault()
  api.logOut()
    .then(ui.onLogOutSuccess)
}

module.exports = {
  gameBoard,
  selectSpace,
  onSignUp,
  onSignIn,
  onEditPassword,
  onLogOut,
  createNewGame
}
