'use strict'

const config = require('./config')
const store = require('./store')

const create = function (formFieldsData) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data: formFieldsData
  })
}

const signIn = function (formFieldsData) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data: formFieldsData
  })
}

const editPassword = function (formFieldsData) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: formFieldsData
  })
}

const logOut = function () {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const newGame = function (formFieldsData) {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: formFieldsData
  })
}

const updateGameStatus = function (index, array) {
  const apiObject = {
    'game': {
      'cell': {
        'index': index,
        'value': array[index]
      },
      'over': store.game.over
    }
  }
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: apiObject
  })
}

const viewAllCompleteGames = function () {
  return $.ajax({
    url: config.apiOrigin + '/games?over=true',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const onViewGameByID = function (gameID) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + gameID,
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  create,
  signIn,
  editPassword,
  logOut,
  newGame,
  updateGameStatus,
  viewAllCompleteGames,
  onViewGameByID
}
