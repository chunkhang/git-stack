#!/usr/bin/env node

const inquirer = require('inquirer')

const { choices, actions } = require('../lib')

const main = async () => {
  const question = {
    type: 'list',
    name: 'action',
    message: 'Which action to perform?',
    choices,
  }
  const answers = await inquirer.prompt([question])
  const action = actions[answers.action]
  action()
}

main()
