const execa = require('execa')

module.exports = async () => {
  const { stdout } = await execa('echo', ['list'])
  console.log(stdout)
}
