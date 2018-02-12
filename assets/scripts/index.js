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
  $('#rotating-turn-tracker').hide()
  $('.view-prior-page').hide()
  $('#prior-games-wrapper').hide()
  $('.prior-games-table-table').hide()
  $('#game-readout-table').hide()
  $('.game-cell').on('click', events.selectSpace)
  $('#register-form').on('submit', events.onSignUp)
  $('#log-in-form').on('submit', events.onSignIn)
  $('#edit-password-form').on('submit', events.onEditPassword)
  $('#log-out').on('click', events.onLogOut)
  $('#create-new-game').on('click', events.createNewGame)
  $('#view-prior-games').on('click', events.onViewPrior)
  $('#return-to-profile').on('click', events.onReturn)
  $('#view-all-prior').on('click', events.onViewAllPrior)
  $('#return-to-prior-games-page').on('click', events.onReturnToPriorGamesPage)
  $('#view-by-id-form').on('submit', events.viewGameByID)
})
