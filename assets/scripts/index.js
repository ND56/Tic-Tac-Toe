'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const events = require('./events')

$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  // $('.log-in-screen').hide()
  $('.game-board').hide()
  $('.user-profile-page').hide()
  $('.cell-button').on('click', events.selectSpace)
  $('#register-form').on('submit', events.onSignUp)
  $('#log-in-form').on('submit', events.onSignIn)
})

// starting off with the
// game board hidden because
// first page is going
// to be the log in page
