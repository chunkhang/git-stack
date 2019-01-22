#!/usr/bin/env node

const inquirer = require('inquirer')

const pkg = require('../package.json')
const { listStashes, clearStashes } = require('../lib/stashes')
const { VERSION_ARGS } = require('../lib/constants')

let STASHES
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
  let items
  const stashes = await listStashes()
  if (stashes.length > 0) {
    STASHES = stashes.map((stash, index) => {
      return {
        name: `* ${stash.message} (${stash.date})`,
        value: index,
        short: stash.message,
      }
    })
    items = [ADD, SEPARATOR, ...STASHES, SEPARATOR, CLEAR]
  } else {
    items = [ADD]
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
    const choice = answers.item
    // Action chosen
    if (typeof choice === 'string') {
      // Clear stashes
      if (choice === 'clear') {
        await clearStashes()
        console.log('Cleared all stashes')
      }
    // Stash chosen
    } else {
      console.log(choice)
    }
  } else if (VERSION_ARGS.includes(process.argv[2])) {
    /* Version */
    console.log(pkg.version)
  }
}

main()
