const express = require('express')
const app = express()
const port = 3000

app.get('/about', (req, res) => {
  res.sendFile('./about.html', {root: __dirname})
})

app.get('/contact', (req, res) => {
  res.sendFile('./contact.html', {root: __dirname})
})

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: __dirname})
})

app.use('/', (req, res) => {
  res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})


// const http = require('http')
// const fs = require('fs')
// const port = 3000

// http
// 	.createServer((req, res) => {
// 		res.writeHead(200, {
// 			'Content-Type': 'text/html',
// 		})

// 		const url = req.url
// 		if(url === '/about') {
// 			res.write('<h1>Halaman About</h1>')
// 			res.end()
// 		} else if(url === '/contact') {
// 			res.write('<h1>Halaman Contact</h1>')
// 			res.end()
// 		} else {
// 			// res.write('Hello World')
// 			fs.readFile('./index.html', (err, data) => {
// 				if (err) {
// 					res.writeHead(404)
// 					res.write('Error : File not found')
// 				} else {
// 					res.write(data)
// 				}
// 				res.end()
// 			})
// 		}

// 	})
// 	.listen(port, () => {
// 		console.log(`server is listening on port ${port} ...`)
// 	})
