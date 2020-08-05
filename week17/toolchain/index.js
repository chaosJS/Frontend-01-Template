const readline = require('readline')
//
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
async function ask(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}
;(async () => {
  const name = await ask('Your project name?')
  console.log(name)
  process.exit()
})()
