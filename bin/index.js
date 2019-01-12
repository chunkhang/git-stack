#!/usr/bin/env node

const inquirer = require('inquirer')

const { choices, actions } = require('../lib')

const main = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Which action to perform?',
      choices,
    },
  ])
  const action = actions[answers.action]
  action()
}

main()
