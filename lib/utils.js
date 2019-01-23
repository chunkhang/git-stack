const { SYMBOLS } = require('./constants')

const print = (message) => {
  console.log(`${SYMBOLS.PRINT} ${message}`)
}

module.exports = {
  print,
}
