const express = require('express')
const app = express()
const { loadContact, findContact } = require('./utils/contacts')

const expressLayouts = require('express-ejs-layouts')
const port = 3000

app.set('view engine', 'ejs') //gunakan ejs
app.use(expressLayouts) //middleware third party
app.use(express.static('public')) //Builtin middleware

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

app.get('/contact', (req, res) => {
	const contacts = loadContact()
	res.render('contact', {
		layout: 'layouts/main-layout',
		title: 'Halaman Contact',
		contacts,
	})
})

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
