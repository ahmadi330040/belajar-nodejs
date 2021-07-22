const http = require('http')
const port = 3000

http
	.createServer((req, res) => {
		res.writeHead(200, {
			'Content-Type': 'text/html',
		})
		res.write('Hello World')
		res.end()
	})
	.listen(port, () => {
		console.log(`server is listening on port ${port} ...`)
	})
