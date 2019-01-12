const execa = require('execa')

module.exports = async () => {
  const { stdout } = await execa('echo', ['remove'])
  console.log(stdout)
}
