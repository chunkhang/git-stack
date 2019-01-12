#!/usr/bin/env node

const inquirer = require('inquirer')
const autocomplete = require('inquirer-autocomplete-prompt')

const { choices, actions } = require('../lib')

const includeFilter = (string, pattern) => {
  return string.toLowerCase().includes(pattern.toLowerCase())
}

const filterActions = (input) => {
  return choices.filter((choice) => {
    // Initial input is undefined, so we do not filter at all for that
    return input ? includeFilter(choice.name, input) : true
  })
}

const main = async () => {
  inquirer.registerPrompt('autocomplete', autocomplete)
  const answers = await inquirer.prompt({
    type: 'autocomplete',
    name: 'action',
    message: 'Which action to perform?',
    source: async (_, input) => filterActions(input),
  })
  const action = actions[answers.action]
  action()
}

main()
