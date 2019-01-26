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

const includeFilter = (choice, input) => {
  let matched
  // Match name
  matched = choice.name.toLowerCase().includes(input.toLowerCase())
  if (input.length === 1) {
    // Match symbol too
    matched = matched || choice.symbol === input
  }
  return matched
}

const select = async (message, choices) => {
  const answers = await prompt({
    type: 'autocomplete',
    message,
    source: async (_, input) => {
      const filteredChoices = choices.filter((choice) => {
        // Initial input is undefined, so we do not filter at all for that
        return input ? includeFilter(choice, input) : true
      })
      const items = filteredChoices.map((choice) => {
        return {
          ...choice,
          name: `${choice.symbol} ${choice.name}`,
        }
      })
      return items
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
