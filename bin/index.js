#!/usr/bin/env node

const execa = require('execa')
const inquirer = require('inquirer')

const pkg = require('../package.json')
const { VERSION_ARGS } = require('../lib/constants')

const STASHES = []
const SEPARATOR = new inquirer.Separator()
const ADD = {
  name: '+ Add stash',
  value: 'add',
  short: 'Add stash',
}
const CLEAR = {
  name: 'x Clear stashes',
  value: 'clear',
  short: 'Clear stashes',
}

const getItems = async () => {
  let hasStashes = true
  // Get details of all stashes
  const commands = {
    dates: await execa('git', ['stash', 'list', '--pretty=format:%ar']),
    messages: await execa('git', ['stash', 'list', '--pretty=format:%s']),
  }
  const details = {}
  Object.entries(commands).forEach((entry) => {
    const command = entry[0]
    const result = entry[1]
    // No stashes
    if (result.stdout === '') hasStashes = false
    details[command] = result.stdout.split('\n')
  })
  let items = [ADD]
  if (hasStashes) {
    // Construct stashes
    for (let i = 0; i < details.dates.length; i++) {
      const date = details.dates[i]
      const message = details.messages[i]
      const stash = {
        name: `* ${message} (${date})`,
        value: i,
        short: message,
      }
      STASHES.push(stash)
    }
    items = items.concat(SEPARATOR, STASHES, SEPARATOR, CLEAR)
  }
  return items
}

const main = async () => {
  if (process.argv.length < 3) {
    /* Main entry point */
    // Choose stash or action
    const answers = await inquirer.prompt({
      type: 'list',
      name: 'item',
      message: 'Choose a stash or action:',
      choices: await getItems(),
    })
    console.log(answers.item)
  } else if (VERSION_ARGS.includes(process.argv[2])) {
    /* Version */
    console.log(pkg.version)
  }
}

main()
