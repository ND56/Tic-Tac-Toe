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
  $('#first-turn-tracker #player-x-span').text(store.user.email)
  $('#first-turn-tracker').show()
  // send api request for new board
  api.newGame(data)
    .then(ui.onCreateNewGameSuccess)
    .catch(ui.onCreateNewGameFailure)
}

const selectSpace = function (event) {
  event.preventDefault()
  const cellValue = event.target
  const cellId = event.target.attributes.id
  const cellIdValue = $(cellId).val()
  if ($(cellValue).text() !== '') {
    ui.onInvalidSpace()
  } else {
    gameLogic.determineValue(gameBoard, cellValue, cellIdValue)
    gameLogic.checkForWin(gameBoard)
    api.updateGameStatus(cellIdValue, gameBoard)
      .catch(ui.onSelectSpaceFailure)
  }
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.create(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
  $('#register-form').each(function () {
    this.reset()
  })
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
  $('#log-in-form').each(function () {
    this.reset()
  })
}

const onEditPassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.editPassword(data)
    .then(ui.onEditPasswordSuccess)
    .catch(ui.onEditPasswordFailure)
  $('#edit-password-form').each(function () {
    this.reset()
  })
}

const onLogOut = function (event) {
  event.preventDefault()
  api.logOut()
    .then(ui.onLogOutSuccess)
    .catch(ui.onLogOutFailure)
}

const onViewPrior = function (event) {
  event.preventDefault()
  $('.user-profile-page').hide()
  $('#user-x-prior-games').text(store.user.email + '\'s prior games')
  $('.view-prior-page').show()
}

const onReturn = function (event) {
  event.preventDefault()
  $('.view-prior-page').hide()
  $('.user-profile-page').show()
}

const onViewAllPrior = function (event) {
  event.preventDefault()
  api.viewAllCompleteGames()
    .then(ui.onViewAllSuccess)
    .catch(ui.onViewAllPriorFailure)
}

const onReturnToPriorGamesPage = function (event) {
  event.preventDefault()
  $('#prior-games-wrapper').hide()
  $('.prior-games-table-expander').empty()
  $('#user-x-prior-games').text(store.user.email + '\'s prior Games')
  $('#view-button-wrapper').show()
}

const viewGameByID = function (event) {
  event.preventDefault()
  const gameID = $('#game-id-input').val()
  api.onViewGameByID(gameID)
    .then(ui.onViewByIDSuccess)
    .catch(ui.onViewByIDFailure)
  $('#view-by-id-form').each(function () {
    this.reset()
  })
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
