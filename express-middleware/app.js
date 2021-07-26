const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const port = 3000

//gunakan ejs
app.set('view engine', 'ejs')

//middleware third party
app.use(morgan('dev'))
app.use(expressLayouts)

//Builtin middleware
app.use(express.static('public'))

// Appliication level middleware
app.use(function (req, res, next) {
	console.log('Time :', Date.now())
	next()
})
app.use(function (req, res, next) {
	console.log('middleware ke 2')
	next()
})

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
	res.render('contact', {
		layout: 'layouts/main-layout',
		title: 'Halaman Contact',
	})
})

app.get('/product/:id', (req, res) => {
	res.send(
		`product ID : ${req.params.id} <br> category ID : ${req.query.category}`
	)
})

app.use('/', (req, res) => {
	res.status(404)
	res.send('<h1>404</h1>')
})

app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`)
})
