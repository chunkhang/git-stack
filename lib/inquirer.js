const inquirer = require('inquirer')
const autocomplete = require('inquirer-autocomplete-prompt')

const { PAGE_SIZE } = require('./constants')

const KEY = 'item'

inquirer.registerPrompt('autocomplete', autocomplete)

const prompt = async (params) => {
  return inquirer.prompt({
    ...params,
    name: KEY,
    message: `${params.message}:`,
    pageSize: PAGE_SIZE,
  })
}

const includeFilter = (string, pattern) => {
  return string.toLowerCase().includes(pattern.toLowerCase())
}

const select = async (message, choices) => {
  const answers = await prompt({
    type: 'autocomplete',
    message,
    source: async (_, input) => {
      return choices.filter((choice) => {
        // Initial input is undefined, so we do not filter at all for that
        return input ? includeFilter(choice.name, input) : true
      })
    },
  })
  return answers[KEY]
}

const confirm = async () => {
  const answers = await prompt({
    type: 'confirm',
    message: 'Confirm',
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

module.exports = {
  select,
  confirm,
  input,
}
