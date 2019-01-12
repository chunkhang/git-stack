const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

module.exports = async () => {
  const { stdout } = await exec('echo remove')
  console.log(stdout)
}
