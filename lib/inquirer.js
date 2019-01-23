const inquirer = require('inquirer')

const KEY = 'item'

const prompt = async (params) => {
  return inquirer.prompt({
    ...params,
    name: KEY,
    message: `${params.message}:`,
  })
}

const select = async (message, choices) => {
  const answers = await prompt({
    type: 'list',
    message,
    choices,
  })
  return answers[KEY]
}

const confirm = async () => {
  const answers = await prompt({
    type: 'confirm',
    message: 'Confirm?',
    default: false,
  })
  return answers[KEY]
}

const input = async (message) => {
  const answers = await prompt({
    type: 'input',
    message,
  })
  return answers[KEY]
}

const separator = new inquirer.Separator()

module.exports = {
  select,
  confirm,
  input,
  separator,
}
