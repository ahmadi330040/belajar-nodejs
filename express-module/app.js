const express = require('express')
const app = express()
const port = 3000

app.get('/about', (req, res) => {
	res.sendFile('./about.html', { root: __dirname })
})

app.get('/contact', (req, res) => {
	res.sendFile('./contact.html', { root: __dirname })
})

app.get('/', (req, res) => {
	res.sendFile('./index.html', { root: __dirname })
})

app.get('/product/:id', (req, res) => {
	res.send(`product ID : ${req.params.id} <br> category ID : ${req.params.id}`)
})

app.use('/', (req, res) => {
	res.send('<h1>404</h1>')
})

app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`)
})
