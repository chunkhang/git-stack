const { SYMBOLS } = require('./constants')

const print = (message) => {
  const strings = message.split('\n')
  strings.forEach((string) => {
    console.log(`${SYMBOLS.PRINT} ${string}`)
  })
}

module.exports = {
  print,
}
