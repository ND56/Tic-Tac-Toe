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

module.exports = {
  create,
  signIn,
  editPassword
}
