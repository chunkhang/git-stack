/* eslint-disable global-require */

const actions = {
  add: require('./add'),
  info: require('./info'),
  list: require('./list'),
  remove: require('./remove'),
  use: require('./use'),
}

const choices = [
  {
    name: '* List',
    value: 'list',
    short: 'List stashes',
  },
  {
    name: '+ Add',
    value: 'add',
    short: 'Add stash',
  },
  {
    name: '- Remove',
    value: 'remove',
    short: 'Remove stash',
  },
  {
    name: '~ Use',
    value: 'use',
    short: 'Apply stash',
  },
  {
    name: '? Info',
    value: 'info',
    short: 'Show stash info',
  },
]

module.exports = {
  actions,
  choices,
}
