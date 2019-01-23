const inquirer = require('inquirer')

const KEY = 'item'

const select = async (message, choices) => {
  const answers = await inquirer.prompt({
    type: 'list',
    name: KEY,
    message,
    choices,
  })
  return answers[KEY]
}

const confirm = async () => {
  const answers = await inquirer.prompt({
    type: 'confirm',
    name: KEY,
    message: 'Confirm?',
    default: false,
  })
  return answers[KEY]
}

const separator = new inquirer.Separator()

module.exports = {
  select,
  confirm,
  separator,
}
