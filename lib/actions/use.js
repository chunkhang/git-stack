const execa = require('execa')

module.exports = async () => {
  const { stdout } = await execa('echo', ['use'])
  console.log(stdout)
}
