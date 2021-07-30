const express = require('express')
const app = express()
const {
	loadContact,
	findContact,
	addContact,
	cekDuplikat,
	deleteContact,
} = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const expressLayouts = require('express-ejs-layouts')
const { render } = require('ejs')
const port = 3000

app.set('view engine', 'ejs') //gunakan ejs
app.use(expressLayouts) //middleware third party
app.use(express.static('public')) //Built-in middleware
app.use(express.urlencoded({ extended: true }))

// Konfigurasi flash
app.use(cookieParser('secret'))
app.use(
	session({
		cookie: { maxAge: 6000 },
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
)
app.use(flash())

app.get('/', (req, res) => {
	const mahasiswa = [
		{
			nama: 'Ahmadi',
			email: 'ahmadi@gmail.com',
		},
		{
			nama: 'dony',
			email: 'donny@gmail.com',
		},
		{
			nama: 'rendi',
			email: 'rendi@gmail.com',
		},
	]
	res.render('index', {
		nama: 'Ahmadi',
		title: 'Halaman Home',
		mahasiswa,
		layout: 'layouts/main-layout',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		layout: 'layouts/main-layout',
		title: 'Halaman About',
	})
})

// Menambah data contact
app.get('/contact/add', (req, res) => {
	res.render('add-contact', {
		layout: 'layouts/main-layout',
		title: 'Halaman Tambah Data',
	})
})

// Proses menambah data contact
app.post(
	'/contact',
	[
		body('nama').custom((value) => {
			const duplikat = cekDuplikat(value)
			if (duplikat) {
				throw new Error('Nama Contact sudah digunakan')
			}
			return true
		}),
		check('email', 'Email tidak valid').isEmail(),
		check('nohp', 'Nomor hp tidak valid').isMobilePhone('id-ID'),
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			// return res.status(400).json({ errors: errors.array() })
			res.render('add-contact', {
				layout: 'layouts/main-layout',
				title: 'Halaman Tambah Data',
				errors: errors.array(),
			})
		} else {
			addContact(req.body)
			req.flash('msg', 'Data contact berhasil datambahkan')
			res.redirect('/contact')
		}
	}
)

// Menampilkan semua data contact di contacts.json
app.get('/contact', (req, res) => {
	const contacts = loadContact()
	res.render('contact', {
		layout: 'layouts/main-layout',
		title: 'Halaman Contact',
		contacts,
		msg: req.flash('msg'),
	})
})

// Menampilkan data contact berdasarkan nama
app.get('/contact/:nama', (req, res) => {
	const contact = findContact(req.params.nama)
	res.render('detail', {
		layout: 'layouts/main-layout',
		title: 'Halaman Contact',
		contact,
	})
})

// Menghapus contact berdasarkan nama
app.get('/contact/delete/:nama', (req, res) => {
	const contact = findContact(req.params.nama)
	// Jika contact tidak ada tampilkan 404
	if (!contact) {
		res.status(404), res.send('<h1>404</h1>')
	} else {
		deleteContact(req.params.nama)
		req.flash('msg', 'Data berhasil dihapus')
		res.redirect('/contact')
	}
})

app.use('/', (req, res) => {
	res.status(404)
	res.send('<h1>404</h1>')
})

app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`)
})
