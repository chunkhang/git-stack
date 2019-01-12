#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const autocomplete = require('inquirer-autocomplete-prompt')
const opn = require('opn')

const pkg = require('../package.json')
const { choices, actions } = require('../lib/actions')
const utils = require('../lib/utils')

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
  if (process.argv.length < 3) {
    // Main entry point
    inquirer.registerPrompt('autocomplete', autocomplete)
    const answers = await inquirer.prompt({
      type: 'autocomplete',
      name: 'action',
      message: 'Which action to perform?',
      source: async (_, input) => filterActions(input),
    })
    const action = actions[answers.action]
    action()
  } else {
    // Subcommands
    program
      .command('version')
      .description('display version')
      .action(() => {
        console.log(pkg.version)
      })
    program
      .command('readme')
      .description('open home page in browser')
      .action(() => {
        console.log(pkg.homepage)
        opn(pkg.homepage, {
          wait: false,
        })
      })
    program
      .command('issues')
      .description('open issues page in browser')
      .action(() => {
        console.log(pkg.bugs)
        opn(pkg.bugs, {
          wait: false,
        })
      })
    program
      .command('help')
      .description('display help')
      .action(() => {
        program.help()
      })
    program.parse(process.argv)
  }
}

main()
