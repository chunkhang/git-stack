const execa = require('execa')

module.exports = async () => {
  const { stdout } = await execa('echo', ['add'])
  console.log(stdout)
}

// message
// include untracked
