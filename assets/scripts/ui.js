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
  $('#universal-response-modal-content').text('You selected an invalid space. Please choose an empty square!')
  $('#universal-response-modal').modal('show')
}

const onSignUpSuccess = function (apiResponse) {
  $('#register-modal').modal('hide')
  $('#universal-response-modal-content').text('Your registration was a success, ' + apiResponse.user.email + '. Have fun honing your Tic-Tac-Toe skills!')
  $('#universal-response-modal').modal('show')
}

const onSignUpFailure = function (apiResponse) {
  $('#register-modal').modal('hide')
  $('#universal-response-modal-content').text('Your registration was a failure. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. Make sure you\'re using a unique email address and that your password entries match!')
  $('#universal-response-modal').modal('show')
}

const onSignInSuccess = function (apiResponse) {
  store.user = apiResponse.user
  $('#log-in-modal').modal('hide')
  $('#universal-response-modal-content').text('Log-in successful. Welcome back, ' + apiResponse.user.email + '!')
  $('#universal-response-modal').modal('show')
  $('.log-in-screen').hide()
  $('#user-x-profile').text(apiResponse.user.email + '\'s profile')
  $('.user-profile-page').show()
}

const onSignInFailure = function (apiResponse) {
  $('#log-in-modal').modal('hide')
  $('#universal-response-modal-content').text('Failed to log in. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. Make sure you\'ve already registered and have entered your email and password correctly!')
  $('#universal-response-modal').modal('show')
}

const onEditPasswordSuccess = function (apiResponse) {
  $('#edit-password-modal').modal('hide')
  $('#universal-response-modal-content').text('Your password was successfully updated!')
  $('#universal-response-modal').modal('show')
}

const onEditPasswordFailure = function (apiResponse) {
  $('#edit-password-modal').modal('hide')
  $('#universal-response-modal-content').text('You failed to change your password. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. Make sure you entered your old password correctly!')
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
  $('#game-id-tracker-span').text(apiResponse.game.id)
}

const onCreateNewGameFailure = function (apiResponse) {
  $('#universal-response-modal-content').text('Failed to create a new game. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. The server might be down at the moment. Try again later!')
  $('#universal-response-modal').modal('show')
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
  $('#user-x-prior-games').text(store.user.email + '\'s completed games')
  $('#prior-games-wrapper').show()
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
    // cloning table for game ID & winner readout
    const newTableId = 'prior-games-table' + i
    const newIDSpanID = 'game-id-span' + i
    const newWinnerSpanID = 'winner-span' + i
    const $clone = $('#prior-games-table').clone().show()
    $clone.attr('id', newTableId)
    $clone.appendTo('.prior-games-table-expander')
    $('#' + newTableId + ' #game-id-span').attr('id', newIDSpanID)
    $('#' + newTableId + ' #winner-span').attr('id', newWinnerSpanID)
    $('#' + newIDSpanID).text(apiResponse.games[i].id)
    $('#' + newWinnerSpanID).text(gameWinner)
    // cloning table for cell readout
    const newTableId2 = 'game-readout-table' + i
    const newCell0 = 'readout-0' + i
    const newCell1 = 'readout-1' + i
    const newCell2 = 'readout-2' + i
    const newCell3 = 'readout-3' + i
    const newCell4 = 'readout-4' + i
    const newCell5 = 'readout-5' + i
    const newCell6 = 'readout-6' + i
    const newCell7 = 'readout-7' + i
    const newCell8 = 'readout-8' + i
    const $clone2 = $('#game-readout-table').clone().show()
    $clone2.attr('id', newTableId2)
    $clone2.appendTo('.prior-games-table-expander')
    $('#' + newTableId2 + ' #readout-0').attr('id', newCell0)
    $('#' + newTableId2 + ' #readout-1').attr('id', newCell1)
    $('#' + newTableId2 + ' #readout-2').attr('id', newCell2)
    $('#' + newTableId2 + ' #readout-3').attr('id', newCell3)
    $('#' + newTableId2 + ' #readout-4').attr('id', newCell4)
    $('#' + newTableId2 + ' #readout-5').attr('id', newCell5)
    $('#' + newTableId2 + ' #readout-6').attr('id', newCell6)
    $('#' + newTableId2 + ' #readout-7').attr('id', newCell7)
    $('#' + newTableId2 + ' #readout-8').attr('id', newCell8)
    $('#' + newCell0).text(apiResponse.games[i].cells[0])
    $('#' + newCell1).text(apiResponse.games[i].cells[1])
    $('#' + newCell2).text(apiResponse.games[i].cells[2])
    $('#' + newCell3).text(apiResponse.games[i].cells[3])
    $('#' + newCell4).text(apiResponse.games[i].cells[4])
    $('#' + newCell5).text(apiResponse.games[i].cells[5])
    $('#' + newCell6).text(apiResponse.games[i].cells[6])
    $('#' + newCell7).text(apiResponse.games[i].cells[7])
    $('#' + newCell8).text(apiResponse.games[i].cells[8])
  }
}

const onViewByIDSuccess = function (apiResponse) {
  store.game = apiResponse.game
  $('#view-by-id-modal').modal('hide')
  $('.view-prior-page').hide()
  $('#first-turn-tracker').hide()
  //
  let xCounter = 0
  let oCounter = 0
  let playerTurn = ''
  apiResponse.game.cells.forEach(function (element) {
    if (element === 'x' || element === 'X') {
      xCounter++
    }
    if (element === 'o' || element === 'O') {
      oCounter++
    }
  })
  if (xCounter > oCounter) {
    playerTurn = 'player O'
  } else {
    playerTurn = store.user.email
  }
  //
  $('#rotating-turn-tracker').text('Your turn, ' + playerTurn + '!')
  $('.game-board').show()
  $('#rotating-turn-tracker').show()
  $('#game-id-tracker-span').text(apiResponse.game.id)
}

const onViewByIDFailure = function (apiResponse) {
  $('#view-by-id-modal').modal('hide')
  $('#universal-response-modal-content').text('Failed to locate a game by that ID. The server responded with with error code: ' + apiResponse.status + ':, ' + apiResponse.statusText + '. Make sure you entered a correct ID!')
  $('#universal-response-modal').modal('show')
}

const onSelectSpaceFailure = function (apiResponse) {
  $('#universal-response-modal-content').text('Failed to update the game board. The server responded with with error code: ' + apiResponse.status + ':, ' + apiResponse.statusText + '. The serve might be down at the moment. Try again later!')
  $('#universal-response-modal').modal('show')
}

const onLogOutFailure = function (apiResponse) {
  $('#universal-response-modal-content').text('Failed to log out. The server responded with with error code: ' + apiResponse.status + ':, ' + apiResponse.statusText + '. The serve might be down at the moment. Try again later!')
  $('#universal-response-modal').modal('show')
}

const onViewAllPriorFailure = function (apiResponse) {
  $('#universal-response-modal-content').text('Failed to load prior games. The server responded with with error code: ' + apiResponse.status + ':, ' + apiResponse.statusText + '. The serve might be down at the moment. Try again later!')
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
  onInvalidSpace,
  onCreateNewGameFailure,
  onSelectSpaceFailure,
  onLogOutFailure,
  onViewAllPriorFailure
}
