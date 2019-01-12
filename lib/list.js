const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

const action = async () => {
  const { stdout } = await exec('echo list')
  console.log(stdout)
}

module.exports = action
