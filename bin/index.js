#!/usr/bin/env node

const pkg = require('../package.json')
const git = require('../lib/git')
const inquirer = require('../lib/inquirer')
const { print } = require('../lib/utils')
const { VERSION_ARGS, SYMBOLS, DEFAULT_MESSAGE } = require('../lib/constants')

let STASHES
const PUSH = {
  name: `${SYMBOLS.PUSH} Push`,
  value: 'push',
  short: 'Push stash',
}
const CLEAR = {
  name: `${SYMBOLS.CLEAR} Clear`,
  value: 'clear',
  short: 'Clear stashes',
}

const getChoices = async () => {
  let choices = [PUSH]
  const stashes = await git.listStashes()
  if (stashes.length > 0) {
    STASHES = stashes.map((stash, index) => {
      return {
        name: `${SYMBOLS.STASH} ${stash.message} (${stash.date})`,
        value: index,
        short: stash.message,
      }
    })
    choices = choices.concat(
      inquirer.separator,
      STASHES,
      inquirer.separator,
      CLEAR,
    )
  }
  return choices
}

const getStashActions = () => {
  return [
    {
      name: `${SYMBOLS.SHOW} Show`,
      value: 'show',
      short: 'Show stash',
    },
    {
      name: `${SYMBOLS.POP} Pop`,
      value: 'pop',
      short: 'Pop stash',
    },
    {
      name: `${SYMBOLS.DROP} Drop`,
      value: 'drop',
      short: 'Drop stash',
    },
  ]
}

const main = async () => {
  if (process.argv.length < 3) {
    // Choose stash or action
    // TODO: Autocomplete select
    const choice = await inquirer.select(
      'Choose a stash or action',
      await getChoices(),
    )
    // Action chosen
    if (typeof choice === 'string') {
      // push stash
      if (choice === 'push') {
        const message = await inquirer.input('Name the stash') || DEFAULT_MESSAGE
        if (await git.pushStash(message)) {
          print('Stashed!')
        } else {
          print('Nothing to stash!')
        }
      // Clear stashes
      } else if (choice === 'clear') {
        if (await inquirer.confirm()) {
          await git.clearStashes()
          print('Poof!')
        }
      }
    // Stash chosen
    } else {
      const index = choice
      // Choose action for stash
      const action = await inquirer.select(
        'Choose an action for stash',
        getStashActions(),
      )
      if (action === 'show') {
        await git.showStash(index)
      } else if (action === 'pop') {
        await git.popStash(index)
        print('Pop!')
      } else if (action === 'drop') {
        await git.dropStash(index)
        print('Poof!')
      }
    }
  } else if (VERSION_ARGS.includes(process.argv[2])) {
    // Version
    console.log(pkg.version)
  }
}

main()
