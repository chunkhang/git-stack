#!/usr/bin/env node

const inquirer = require('inquirer')
const autocomplete = require('inquirer-autocomplete-prompt')

const pkg = require('../package.json')
const { choices, actions } = require('../lib/actions')
const utils = require('../lib/utils')
const { VERSION_ARGS } = require('../lib/constants')

const includeFilter = (string, pattern) => {
  return string.toLowerCase().includes(pattern.toLowerCase())
}

const filterActions = (input) => {
  return choices.filter((choice) => {
    // Match symbol as well as value
    const string = choice.symbol + choice.value
    // Initial input is undefined, so we do not filter at all for that
    return input ? includeFilter(string, input) : true
  }).map((choice) => {
    return Object.assign(choice, {
      name: `${choice.symbol} ${utils.capitalize(choice.value)}`,
    })
  })
}

const main = async () => {
  const args = process.argv.slice(2)
  if (args.length >= 1 && VERSION_ARGS.includes(args[0])) {
    // Print version
    console.log(pkg.version)
  } else {
    // Prompt action to perform
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
}

main()
