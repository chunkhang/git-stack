/* eslint-disable global-require */

const actions = {
  add: require('./add'),
  info: require('./info'),
  list: require('./list'),
  remove: require('./remove'),
  use: require('./use'),
}

const choices = [
  { name: 'List', value: 'list' },
  { name: 'Add', value: 'add' },
  { name: 'Use', value: 'use' },
  { name: 'Info', value: 'info' },
  { name: 'Remove', value: 'remove' },
]

module.exports = {
  actions,
  choices,
}
