const { mongoClient } = require('mongodb')

const uri =
	'mongosh "mongodb+srv://cluster0.jaza7.mongodb.net/myFirstDatabase" --username sa'
const dbName = 'ahmadidb'
const client = new mongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

client.connect((error, client) => {
	if (error) {
		return console.log('koneksi gagal')
	}
	console.log('koneksi berhasil')
})
