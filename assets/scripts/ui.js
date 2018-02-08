'use strict'

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

module.exports = {
  editGameBoard,
  editTurnTracker,
  onSignUpSuccess,
  onSignUpFailure
}
