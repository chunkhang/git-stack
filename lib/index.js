const list = require('./list')
const add = require('./add')
const use = require('./use')
const info = require('./info')
const remove = require('./remove')

const choices = [
  { name: 'List', value: 'list' },
  { name: 'Add', value: 'add' },
  { name: 'Use', value: 'use' },
  { name: 'Info', value: 'info' },
  { name: 'Remove', value: 'remove' },
]

const actions = {
  list,
  add,
  use,
  info,
  remove,
}

module.exports = {
  choices,
  actions,
}
