const execa = require('execa')

module.exports = async () => {
  const { stdout } = await execa('echo', ['info'])
  console.log(stdout)
}

// summary
// diff
