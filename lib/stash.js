const execa = require('execa')

const listStashes = async () => {
  // Get details
  const commands = {
    dates: await execa('git', ['stash', 'list', '--pretty=format:%ar']),
    messages: await execa('git', ['stash', 'list', '--pretty=format:%s']),
  }
  const details = {}
  let hasStashes = true
  Object.entries(commands).forEach((entry) => {
    const command = entry[0]
    const result = entry[1]
    if (result.stdout === '') hasStashes = false
    details[command] = result.stdout.split('\n')
  })
  // Construct stashes
  const stashes = []
  if (hasStashes) {
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

module.exports = {
  listStashes,
  clearStashes,
}
