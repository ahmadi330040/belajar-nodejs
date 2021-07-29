const express = require('express')
const app = express()
const { loadContact, findContact, addContact } = require('./utils/contacts')
const { body, validationResult } = require('express-validator')

const expressLayouts = require('express-ejs-layouts')
const port = 3000

app.set('view engine', 'ejs') //gunakan ejs
app.use(expressLayouts) //middleware third party
app.use(express.static('public')) //Built-in middleware
app.use(express.urlencoded({ extended: true }))

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
	[body('email').isEmail(), body('nohp').isMobilePhone()],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		// addContact(req.body)
		// res.redirect('/contact')
	}
)

// Menampilkan semua data contact di contacts.json
app.get('/contact', (req, res) => {
	const contacts = loadContact()
	res.render('contact', {
		layout: 'layouts/main-layout',
		title: 'Halaman Contact',
		contacts,
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

app.use('/', (req, res) => {
	res.status(404)
	res.send('<h1>404</h1>')
})

app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`)
})
