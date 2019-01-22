#!/usr/bin/env node

const pkg = require('../package.json')
const { listStashes, clearStashes } = require('../lib/stash')
const { select, confirm, separator } = require('../lib/inquirer')
const { VERSION_ARGS } = require('../lib/constants')

let STASHES
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

const getChoices = async () => {
  let choices = [ADD]
  const stashes = await listStashes()
  if (stashes.length > 0) {
    STASHES = stashes.map((stash, index) => {
      return {
        name: `* ${stash.message} (${stash.date})`,
        value: index,
        short: stash.message,
      }
    })
    choices = choices.concat(separator, STASHES, separator, CLEAR)
  }
  return choices
}

const main = async () => {
  if (process.argv.length < 3) {
    // Choose stash or action
    const choice = await select(
      'Choose a stash or action',
      await getChoices,
    )
    // Action chosen
    if (typeof choice === 'string') {
      // Clear stashes
      if (choice === 'clear') {
        if (await confirm()) {
          await clearStashes()
          console.log('Done')
        }
      }
    // Stash chosen
    } else {
      console.log(choice)
    }
  } else if (VERSION_ARGS.includes(process.argv[2])) {
    // Version
    console.log(pkg.version)
  }
}

main()
