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

module.exports = {
  editGameBoard,
  editTurnTracker,
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onEditPasswordSuccess,
  onEditPasswordFailure,
  onLogOutSuccess
}
