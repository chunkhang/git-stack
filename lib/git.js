const execa = require('execa')

const listStashes = async () => {
  // Get details
  const commands = {
    dates: await execa('git', ['stash', 'list', '--pretty=format:%ar']),
    messages: await execa('git', ['stash', 'list', '--pretty=format:%s']),
  }
  const stashes = []
  // If there are stashes
  if (commands.dates.stdout) {
    const details = {}
    Object.entries(commands).forEach((entry) => {
      const command = entry[0]
      const result = entry[1]
      details[command] = result.stdout.split('\n')
    })
    // Construct stashes
    for (let i = 0; i < details.dates.length; i++) {
      const stash = {
        date: details.dates[i],
        message: details.messages[i],
      }
      stashes.push(stash)
    }
  }
  return stashes
}

const clearStashes = async () => {
  await execa('git', ['stash', 'clear'])
}

const pushStash = async (message) => {
  const result = await execa('git', ['stash', 'push', '--message', message])
  if (result.stdout === 'No local changes to save') return false
  return true
}

const popStash = async (index) => {
  await execa('git', ['stash', 'pop', `stash@{${index}}`])
}

const dropStash = async (index) => {
  await execa('git', ['stash', 'drop', `stash@{${index}}`])
}

const showStash = async (index) => {
  await execa('git', ['stash', 'show', '-p', `stash@{${index}}`], { stdio: 'inherit' })
}

module.exports = {
  listStashes,
  clearStashes,
  pushStash,
  popStash,
  dropStash,
  showStash,
}
