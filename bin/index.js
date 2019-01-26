#!/usr/bin/env node

const pkg = require('../package.json')
const git = require('../lib/git')
const inquirer = require('../lib/inquirer')
const { print } = require('../lib/utils')
const { VERSION_ARGS, SYMBOLS, DEFAULT_MESSAGE } = require('../lib/constants')

const getChoices = async () => {
  const push = {
    symbol: SYMBOLS.PUSH,
    name: 'Push',
    value: 'push',
    short: 'Push stash',
  }
  const clear = {
    symbol: SYMBOLS.CLEAR,
    name: 'Clear',
    value: 'clear',
    message: 'Clear stashes',
  }
  const stashList = await git.listStashes()
  if (stashList.length > 0) {
    const stashes = stashList.map((stash, index) => {
      return {
        symbol: SYMBOLS.STASH,
        name: `${stash.message} (${stash.date})`,
        value: index,
        short: stash.message,
      }
    })
    return [...stashes, push, clear]
  }
  return [push]
}

const getStashActions = () => {
  return [
    {
      symbol: SYMBOLS.SHOW,
      name: 'Show',
      value: 'show',
      short: 'Show stash',
    },
    {
      symbol: SYMBOLS.POP,
      name: 'Pop',
      value: 'pop',
      short: 'Pop stash',
    },
    {
      symbol: SYMBOLS.DROP,
      name: 'Drop',
      value: 'drop',
      short: 'Drop stash',
    },
  ]
}

const main = async () => {
  if (process.argv.length < 3) {
    // Choose stash or action
    const choice = await inquirer.select(
      'Choose a stash or action',
      await getChoices(),
    )
    // Action chosen
    if (typeof choice === 'string') {
      if (choice === 'push') {
        const message = await inquirer.input('Name the stash') || DEFAULT_MESSAGE
        if (await git.pushStash(message)) {
          print('Stashed!')
        } else {
          print('Nothing to stash!')
        }
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
