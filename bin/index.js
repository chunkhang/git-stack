#!/usr/bin/env node

const pkg = require('../package.json')
const git = require('../lib/git')
const inquirer = require('../lib/inquirer')
const { print } = require('../lib/utils')
const { VERSION_ARGS, SYMBOLS, DEFAULT_MESSAGE } = require('../lib/constants')

const getMainChoices = async () => {
  const push = {
    symbol: SYMBOLS.PUSH,
    name: 'Push',
    value: {
      type: 'action',
      action: 'push',
    },
    short: 'Push stash',
  }
  const clear = {
    symbol: SYMBOLS.CLEAR,
    name: 'Clear',
    value: {
      type: 'action',
      action: 'clear',
    },
    short: 'Clear stashes',
  }
  const quit = {
    symbol: SYMBOLS.QUIT,
    name: 'Quit',
    value: {
      type: 'action',
      action: 'quit',
    },
    short: 'Quit',
  }
  const stashList = await git.listStashes()
  if (stashList.length > 0) {
    const stashes = stashList.map((stash, index) => {
      return {
        symbol: SYMBOLS.STASH,
        name: `Stash - ${stash.message} (${stash.date})`,
        value: {
          type: 'stash',
          stash: {
            index,
            message: stash.message,
          },
        },
        short: 'Go to stash',
      }
    })
    return [...stashes, push, clear, quit]
  }
  return [push, quit]
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
    {
      symbol: SYMBOLS.BACK,
      name: 'Back',
      value: 'back',
      short: 'Back to main menu',
    },
  ]
}

const main = async () => {
  // Check whether in git repository
  if (!await git.checkRepository()) {
    process.exit(1)
  }
  if (process.argv.length < 3) {
    for (;;) {
      // Main menu
      const mainChoice = await inquirer.select(
        'MAIN MENU',
        await getMainChoices(),
      )
      if (mainChoice.type === 'action') {
        const { action } = mainChoice
        if (action === 'push') {
          const message = await inquirer.input('Stash name') || DEFAULT_MESSAGE
          if (await git.pushStash(message)) {
            print('Pushed!')
          } else {
            print('Nothing to push!')
          }
        } else if (action === 'clear') {
          if (await inquirer.confirm()) {
            await git.clearStashes()
            print('Poof!')
          }
        } else if (action === 'quit') {
          process.exit()
        }
      } else if (mainChoice.type === 'stash') {
        const { index, message } = mainChoice.stash
        for (;;) {
          // Stash
          const action = await inquirer.select(
            `STASH - ${message}`,
            getStashActions(),
          )
          if (action === 'show') {
            await git.showStash(index)
          } else if (action === 'pop') {
            await git.popStash(index)
            print('Popped!')
            break
          } else if (action === 'drop') {
            await git.dropStash(index)
            print('Poof!')
            break
          } else if (action === 'back') {
            break
          }
        }
      }
    }
  } else if (VERSION_ARGS.includes(process.argv[2])) {
    // Version
    console.log(pkg.version)
  }
}

main()
