'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const gameLogic = require('./game-logic')
const getFormFields = require('../../lib/get-form-fields')

$(() => {
  setAPIOrigin(location, config)
})

const callback = function (event) {
  event.preventDefault()
  const cellValue = event.target.parentElement
  const cellId = event.target.attributes.id
  const cellIdValue = $(cellId).val()
  console.log(cellIdValue)
  $(cellValue).text('X')
}

$('.b0').on('click', gameLogic.selectSpace)
