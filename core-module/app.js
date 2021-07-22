const { demandOption } = require('yargs')
const yargs = require('yargs')
const contacts = require('./contacts')

//mengambil argument dari command line
// console.log(process.argv[2])

yargs
	.command({
		command: 'add',
		describe: 'Menambahkan contacts baru',
		builder: {
			nama: {
				describe: 'Nama Lengkap',
				demandOption: true,
				type: 'string',
			},
			email: {
				describe: 'email',
				demandOption: false,
				type: 'string',
			},
			nohp: {
				describe: 'Nomor hp',
				demandOption: true,
				type: 'string',
			},
		},
		handler(argv) {
			contacts.simpanContact(argv.nama, argv.email, argv.nohp)
		},
	})
	.demandCommand()

//menampilkan daftar semua nama dan nohp contact
yargs.command({
	command: 'list',
	describe: 'menampilkan semua nama dan semua nohp',
	handler() {
		contacts.listContact()
	},
})

//menampilkan detail sebuah contact
yargs.command({
	command: 'detail',
	describe: 'menampilkan detail sebuah detail contact berdasarkan nama',
	builder: {
		nama: {
			describe: 'Nama Lengkap',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		contacts.detailContact(argv.nama)
	},
})

//menghapus sebuah contact
yargs.command({
	command: 'delete',
	describe: 'menghapus sebuah contact berdasarkan nama',
	builder: {
		nama: {
			describe: 'Nama Lengkap',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		contacts.deleteContact(argv.nama)
	},
})

yargs.parse()

// const contacts = require('./contacts')

// const main = async () => {
// 	const nama = await contacts.tulisPertanyaan('Masukkan nama anda :')
// 	const email = await contacts.tulisPertanyaan('Masukkan email anda :')
// 	const nohp = await contacts.tulisPertanyaan('Masukkan nohp anda :')

// 	contacts.simpanContact(nama, email, nohp)
// }
// main()
