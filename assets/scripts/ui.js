'use strict'

const store = require('./store')

const editGameBoard = function (cellValue, value) {
  $(cellValue).text(value)
}

const editTurnTracker = function (value) {
  $('#turn-tracker').text('Your turn, player ' + value + '!')
}

const onSignUpSuccess = function (apiResponse) {
  console.log(apiResponse)
  $('#register-modal-content').text('Your registration was a success, ' + apiResponse.user.email + '; have fun honing your Tic-Tac-Toe skills!')
}

const onSignUpFailure = function (apiResponse) {
  console.log(apiResponse)
  $('#register-modal-content').text('Your registration was a failure. The server responded with the following error code: ' + apiResponse.status + '. Your error code was accompanied by the following message: ' + apiResponse.statusText + '. Make sure you\'re using a unique email address and that your password entries match!')
}

const onSignInSuccess = function (apiResponse) {
  console.log(apiResponse)
  store.user = apiResponse.user
  $('#log-in-modal-content').text('Log-in successful; welcome back, ' + apiResponse.user.email + '!')
  $('.log-in-screen').hide()
  $('#user-x-profile').text(apiResponse.user.email + '\'s Profile')
  $('.user-profile-page').show()
}

const onSignInFailure = function (apiResponse) {
  console.log(apiResponse)
  $('#log-in-modal-content').text('Failed to log in. The server responded with the following error code: ' + apiResponse.status + '. Your error code was accompanied by the following message: ' + apiResponse.statusText + '. Make sure you\'ve already registered and have entered your email and password correctly!')
  // I need to add for failure
}

module.exports = {
  editGameBoard,
  editTurnTracker,
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure
}
