'use strict'

const gameLogic = require('./game-logic')
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./store')

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
  if ($(cellValue).text() !== '') {
    ui.onInvalidSpace()
  } else {
    gameLogic.determineValue(gameBoard, cellValue, cellIdValue)
    console.log(gameBoard) // for testing purposes
    gameLogic.checkForWin(gameBoard)
    api.updateGameStatus(cellIdValue, gameBoard)
  }
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

const onViewPrior = function (event) {
  event.preventDefault()
  $('.user-profile-page').hide()
  // need to comment out below unless logged in
  $('#user-x-prior-games').text(store.user.email + '\'s Prior Games')
  $('.view-prior-page').show()
}

const onReturn = function (event) {
  event.preventDefault()
  $('.view-prior-page').hide()
  $('.user-profile-page').show()
}

const onViewAllPrior = function (event) {
  event.preventDefault()
  console.log('button works!')
  api.viewAllCompleteGames()
    .then(ui.onViewAllSuccess)
}

const onReturnToPriorGamesPage = function (event) {
  event.preventDefault()
  $('#prior-games-wrapper').hide()
  // need to reset the prior games table
  $('.prior-games-table-expander').empty()
  // need to comment out below unless logged in
  $('#user-x-prior-games').text(store.user.email + '\'s Prior Games')
  $('#view-button-wrapper').show()
}

const viewGameByID = function (event) {
  event.preventDefault()
  const gameID = $('#game-id-input').val()
  api.onViewGameByID(gameID)
    .then(ui.onViewByIDSuccess)
    .catch(ui.onViewByIDFailure)
}

module.exports = {
  gameBoard,
  selectSpace,
  onSignUp,
  onSignIn,
  onEditPassword,
  onLogOut,
  createNewGame,
  onViewPrior,
  onReturn,
  onViewAllPrior,
  onReturnToPriorGamesPage,
  viewGameByID
}
