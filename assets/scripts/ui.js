'use strict'

const store = require('./store')

const editGameBoard = function (cellValue, value) {
  $(cellValue).text(value)
}

const editTurnTracker = function (value) {
  $('#first-turn-tracker').hide()
  $('#rotating-turn-tracker').text('Your turn, player ' + value + '!')
  $('#rotating-turn-tracker').show()
}

const onInvalidSpace = function () {
  console.log('Seriously, pick a diff space.')
  $('#universal-response-modal-content').text('You selected an invalid space. Please choose an empty square!')
  $('#universal-response-modal').modal('show')
}

const onSignUpSuccess = function (apiResponse) {
  console.log(apiResponse)
  $('#register-modal').modal('hide')
  $('#universal-response-modal-content').text('Your registration was a success, ' + apiResponse.user.email + '; have fun honing your Tic-Tac-Toe skills!')
  $('#universal-response-modal').modal('show')
}

const onSignUpFailure = function (apiResponse) {
  console.log(apiResponse)
  $('#register-modal').modal('hide')
  $('#universal-response-modal-content').text('Your registration was a failure. The server responded with the following error code: ' + apiResponse.status + '. Your error code was accompanied by the following message: ' + apiResponse.statusText + '. Make sure you\'re using a unique email address and that your password entries match!')
  $('#universal-response-modal').modal('show')
}

const onSignInSuccess = function (apiResponse) {
  console.log(apiResponse)
  store.user = apiResponse.user
  $('#log-in-modal').modal('hide')
  $('#universal-response-modal-content').text('Log-in successful; welcome back, ' + apiResponse.user.email + '!')
  $('#universal-response-modal').modal('show')
  $('.log-in-screen').hide()
  $('#user-x-profile').text(apiResponse.user.email + '\'s Profile')
  $('.user-profile-page').show()
}

const onSignInFailure = function (apiResponse) {
  console.log(apiResponse)
  $('#log-in-modal').modal('hide')
  $('#universal-response-modal-content').text('Failed to log in. The server responded with the following error code: ' + apiResponse.status + '. Your error code was accompanied by the following message: ' + apiResponse.statusText + '. Make sure you\'ve already registered and have entered your email and password correctly!')
  $('#universal-response-modal').modal('show')
}

const onEditPasswordSuccess = function (apiResponse) {
  console.log(apiResponse)
  $('#edit-password-modal').modal('hide')
  $('#universal-response-modal-content').text('Your password was successfully updated!')
  $('#universal-response-modal').modal('show')
}

const onEditPasswordFailure = function (apiResponse) {
  console.log(apiResponse)
  $('#edit-password-modal').modal('hide')
  $('#universal-response-modal-content').text('You failed to change your password. The server responded with the following error code: ' + apiResponse.status + '. Your error code was accompanied by the following message: ' + apiResponse.statusText + '. Make sure you entered your old password correctly!')
  $('#universal-response-modal').modal('show')
}

const onLogOutSuccess = function () {
  $('#universal-response-modal-content').text('See ya next time!')
  $('#universal-response-modal').modal('show')
  $('.user-profile-page').hide()
  $('.log-in-screen').show()
}

const onCreateNewGameSuccess = function (apiResponse) {
  $('.user-profile-page').hide()
  $('.game-board').show()
  store.game = apiResponse.game
  store.game.over = false
}

const onViewAllSuccess = function (apiResponse) {
  $('#view-button-wrapper').hide()
  // need to comment out below unless logged in
  $('#user-x-prior-games').text(store.user.email + '\'s Completed Games')
  console.log(apiResponse)
  $('#prior-games-wrapper').show()
  // trying to close and append
  for (let i = 0; i < apiResponse.games.length; i++) {
    const newTableId = 'prior-games-table' + i
    const newIDSpanID = 'game-id-span' + i
    const newCellsSpanID = 'cells-span' + i
    const newWinnerSpanID = 'winner-span' + i
    const $clone = $('#prior-games-table').clone().show()
    $clone.attr('id', newTableId)
    $clone.appendTo('.prior-games-table-expander')
    $('#' + newTableId + ' #game-id-span').attr('id', newIDSpanID)
    $('#' + newTableId + ' #cells-span').attr('id', newCellsSpanID)
    $('#' + newTableId + ' #winner-span').attr('id', newWinnerSpanID)
    $('#' + newIDSpanID).text(apiResponse.games[i].id)
    $('#' + newCellsSpanID).text(apiResponse.games[i].cells)
    $('#' + newWinnerSpanID).text('PLACEHOLDER' + i)
  }
}

const onViewByIDSuccess = function (apiResponse) {
  $('#view-by-id-modal').modal('hide')
  $('#view-button-wrapper').hide()
  // need to comment out below unless logged in
  $('#user-x-prior-games').text(store.user.email + '\'s Selected Game')
  console.log(apiResponse)
  $('#prior-games-wrapper').show()
  const newTableId = 'prior-games-table1'
  const newIDSpanID = 'game-id-span1'
  const newCellsSpanID = 'cells-span1'
  const newWinnerSpanID = 'winner-span1'
  const $clone = $('#prior-games-table').clone().show()
  $clone.attr('id', newTableId)
  $clone.appendTo('.prior-games-table-expander')
  $('#' + newTableId + ' #game-id-span').attr('id', newIDSpanID)
  $('#' + newTableId + ' #cells-span').attr('id', newCellsSpanID)
  $('#' + newTableId + ' #winner-span').attr('id', newWinnerSpanID)
  $('#' + newIDSpanID).text(apiResponse.game.id)
  $('#' + newCellsSpanID).text(apiResponse.game.cells)
  $('#' + newWinnerSpanID).text('PLACEHOLDER1')
}

const onViewByIDFailure = function (apiResponse) {
  console.log(apiResponse)
  $('#view-by-id-modal').modal('hide')
  $('#universal-response-modal-content').text('Failed to locate a game by that ID. The server responded with the following error code: ' + apiResponse.status + '. Your error code was accompanied by the following message: ' + apiResponse.statusText + '. Make sure you entered a correct ID!')
  $('#universal-response-modal').modal('show')
}

module.exports = {
  editGameBoard,
  editTurnTracker,
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onEditPasswordSuccess,
  onEditPasswordFailure,
  onLogOutSuccess,
  onCreateNewGameSuccess,
  onViewAllSuccess,
  onViewByIDSuccess,
  onViewByIDFailure,
  onInvalidSpace
}
