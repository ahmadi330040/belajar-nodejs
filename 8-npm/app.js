const validator = require('validator')
const chalk = require('chalk')

// console.log(validator.isEmail('ahmadi.com'))
// console.log(validator.isMobilePhone('085564767', 'id-ID'))
// console.log(validator.isNumeric('085564767u', 'id-ID'))

// console.log(chalk.magenta('Hello world'))
const nama = 'ahmadi'
const pesan = chalk`Lorem ipsum dolor {bgRed sit amet} consectetur adipisicing elit, nama ${nama}`
console.log(pesan)
