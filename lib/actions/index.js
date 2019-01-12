/* eslint-disable global-require */

module.exports = {
  actions: {
    add: require('./add'),
    info: require('./info'),
    list: require('./list'),
    remove: require('./remove'),
    use: require('./use'),
  },
  choices: [
    {
      symbol: '/',
      value: 'list',
      short: 'List stashes',
    },
    {
      symbol: '+',
      value: 'add',
      short: 'Add stash',
    },
    {
      symbol: '-',
      value: 'remove',
      short: 'Remove stash',
    },
    {
      symbol: '>',
      value: 'use',
      short: 'Apply stash',
    },
    {
      symbol: '?',
      value: 'info',
      short: 'Show stash info',
    },
  ],
}
