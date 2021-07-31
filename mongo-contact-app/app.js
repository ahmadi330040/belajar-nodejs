const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 3000

app.listen(port, () => {
	console.log(`mongo contact app | listen on posrt http://localhost:${port}`)
})

// Setup EJS
app.set('view engine', 'ejs') //gunakan ejs
app.use(expressLayouts) //middleware third party
app.use(express.static('public')) //Built-in middleware
app.use(express.urlencoded({ extended: true }))

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
app.get('/contact', (req, res) => {
	const contacts = loadContact()
	res.render('contact', {
		layout: 'layouts/main-layout',
		title: 'Halaman Contact',
		contacts,
		msg: req.flash('msg'),
	})
})
