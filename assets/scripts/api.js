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

module.exports = {
  create
}
