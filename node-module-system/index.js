// const fs = require('fs') // core module
// const cetakNama = require('./coba.js') //local module
// const moment = require('moment') //third party module /npm / module
// console.log(coba)
const coba = require('./coba')

console.log(
	coba.cetakNama('ahmadi'),
	coba.PI,
	coba.mahasiswa.cetakMhs(),
	new coba.Orang()
)
