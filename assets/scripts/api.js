'use strict'

const config = require('./config')

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
  // I need to store the apiResponse (token is key!)
}

module.exports = {
  create,
  signIn
}
