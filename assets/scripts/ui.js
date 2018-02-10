'use strict'

const store = require('./store')

const editGameBoard = function (cellValue, value) {
  $(cellValue).text(value)
}

const editTurnTracker = function (value) {
  $('#first-turn-tracker').hide()
  $('#rotating-turn-tracker').text('Your turn, ' + value + '!')
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

const checkScore = function (array) {
  if (array[0] !== '' && array[0] === array[3] && array[0] === array[6]) {
    return array[0]
  } else if (array[0] !== '' && array[0] === array[4] && array[0] === array[8]) {
    return array[0]
  } else if (array[0] !== '' && array[0] === array[1] && array[0] === array[2]) {
    return array[0]
  } else if (array[1] !== '' && array[1] === array[4] && array[1] === array[7]) {
    return array[1]
  } else if (array[2] !== '' && array[2] === array[5] && array[2] === array[8]) {
    return array[2]
  } else if (array[3] !== '' && array[3] === array[4] && array[3] === array[5]) {
    return array[3]
  } else if (array[6] !== '' && array[6] === array[7] && array[6] === array[8]) {
    return array[6]
  } else if (array[6] !== '' && array[6] === array[4] && array[6] === array[2]) {
    return array[6]
  } else {
    return 'Tie Game'
  }
}

const onViewAllSuccess = function (apiResponse) {
  $('#view-button-wrapper').hide()
  // need to comment out below unless logged in
  $('#user-x-prior-games').text(store.user.email + '\'s Completed Games')
  console.log(apiResponse)
  $('#prior-games-wrapper').show()
  // trying to clone and append
  let gameWinner
  for (let i = 0; i < apiResponse.games.length; i++) {
    gameWinner = checkScore(apiResponse.games[i].cells)
    if (gameWinner === 'X' || gameWinner === 'x') {
      gameWinner = store.user.email
    } else if (gameWinner === 'o' || gameWinner === 'O') {
      gameWinner = 'Challenger'
    } else {
      gameWinner = 'Tie Game'
    }
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
    $('#' + newWinnerSpanID).text(gameWinner)
  }
}

const onViewByIDSuccess = function (apiResponse) {
  // trying new
  let gameWinner
  gameWinner = checkScore(apiResponse.game.cells)
  if (gameWinner === 'X' || gameWinner === 'x') {
    gameWinner = store.user.email
  } else if (gameWinner === 'o' || gameWinner === 'O') {
    gameWinner = 'Challenger'
  } else {
    gameWinner = 'Tie Game'
  }
  // trying new
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
  $('#' + newWinnerSpanID).text(gameWinner)
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
