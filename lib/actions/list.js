const execa = require('execa')
const inquirer = require('inquirer')

module.exports = async () => {
  // Get details of all stashes
  const commands = {
    dates: await execa('git', ['stash', 'list', '--pretty=format:%ar']),
    messages: await execa('git', ['stash', 'list', '--pretty=format:%s']),
  }
  const details = {}
  Object.entries(commands).forEach((entry) => {
    const command = entry[0]
    const result = entry[1]
    details[command] = result.stdout.split('\n')
  })
  // Construct stashes
  const stashes = []
  for (let i = 0; i < details.dates.length; i++) {
    const date = details.dates[i]
    const message = details.messages[i]
    const stash = {
      name: `${message} (${date})`,
      value: i,
      short: message,
    }
    stashes.push(stash)
  }
  // Choose stash
  const answers = await inquirer.prompt({
    type: 'list',
    name: 'index',
    message: 'Choose stash',
    choices: stashes,
  })
  const stash = stashes[answers.index]
  console.log(stash)
}
