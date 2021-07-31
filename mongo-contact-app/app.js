const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const { body, validationResult, check } = require('express-validator')
const methodOverride = require('method-override')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact.js')
const { deleteOne } = require('./model/contact.js')

const app = express()
const port = 3000

app.listen(port, () => {
	console.log(`mongo contact app | listen on posrt http://localhost:${port}`)
})

// Setup Override
app.use(methodOverride('_method'))

// Setup EJS
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

// Halaman Home
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

// Halaman About
app.get('/about', (req, res) => {
	res.render('about', {
		layout: 'layouts/main-layout',
		title: 'Halaman About',
	})
})

// Halaman Contact
app.get('/contact', async (req, res) => {
	// Contact.find().then((contact) => {
	// 	res.send(contact)
	// })
	const contacts = await Contact.find()

	res.render('contact', {
		layout: 'layouts/main-layout',
		title: 'Halaman Contact',
		contacts,
		msg: req.flash('msg'),
	})
})

// Halaman Menambah data contact
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
		body('nama').custom(async (value) => {
			const duplikat = await Contact.findOne({ nama: value })
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
			res.render('add-contact', {
				layout: 'layouts/main-layout',
				title: 'Halaman Tambah Data',
				errors: errors.array(),
			})
		} else {
			Contact.insertMany(req.body, (error, result) => {
				req.flash('msg', 'Data contact berhasil datambahkan')
				res.redirect('/contact')
			})
		}
	}
)

// Proses Hapus data contact
// app.get('/contact/delete/:nama', async (req, res) => {
// 	const contact = await Contact.findOne({ nama: req.params.nama })
// 	// Jika contact tidak ada tampilkan 404
// 	if (!contact) {
// 		res.status(404), res.send('<h1>404</h1>')
// 	} else {
// 		Contact.deleteOne({ _id: contact._id }).then((result) => {
// 			req.flash('msg', 'Data berhasil dihapus')
// 			res.redirect('/contact')
// 		})
// 	}
// })

app.delete('/contact', (req, res) => {
	Contact.deleteOne({ nama: req.body.nama }).then((result) => {
		req.flash('msg', 'Data berhasil dihapus')
		res.redirect('/contact')
	})
})

// HalamaUubah contact berdasarkan Nama
app.get('/contact/edit/:nama', async (req, res) => {
	const contact = await Contact.findOne(req.params.nama)
	res.render('edit-contact', {
		layout: 'layouts/main-layout',
		title: 'Halaman Edit Contact',
		contact,
	})
})

// Halaman Detail
app.get('/contact/:nama', async (req, res) => {
	// const contact = findContact(req.params.nama)
	const contact = await Contact.findOne({ nama: req.params.nama })
	res.render('detail', {
		layout: 'layouts/main-layout',
		title: 'Halaman Contact',
		contact,
	})
})
