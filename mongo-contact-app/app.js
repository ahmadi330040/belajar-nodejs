const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 3000

app.listen(port, () => {
	console.log(`mongo contact app | listen on posrt http://localhost:${port}`)
})
