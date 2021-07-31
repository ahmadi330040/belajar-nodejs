const { MongoClient } = require('mongodb')

const uri =
	'mongodb+srv://sa:2016330040@cluster0.jaza7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dbName = 'ahmadidb'
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

client.connect((error, client) => {
	if (error) {
		return console.log('koneksi gagal')
	}

	// Pilih database
	const db = client.db(dbName)

	// Menambahkan 1 data ke collection mahasiswa
	// db.collection('mahasiswa').insertOne(
	// 	{
	// 		nama: 'denny caknan',
	// 		email: 'denny@gmail.com',
	// 		nohp: '085635455555',
	// 	},
	// 	(error, result) => {
	// 		if (error) {
	// 			return console.log('data gagal ditambahkan')
	// 		}
	// 		console.log(result)
	// 	}
	// )

	// Menambahkan banyak data ke collection mahasiswa
	// db.collection('mahasiswa').insertMany([
	// 	{
	// 		nama: 'arip fadilah akbar',
	// 		email: 'arif-fadilah@gmail.com',
	// 		nohp: '0856565654334',
	// 	},
	// 	{
	// 		nama: 'andik firdansyah',
	// 		email: 'andik@gmail.com',
	// 		nohp: '085333444222',
	// 	},
	// ]),
	// 	(error, result) => {
	// 		if (error) {
	// 			console.log('data gagal ditambahkan')
	// 		}
	// 		console.log(result)
	// 	}

	// // Menampilkan semua data yang ada pada collection 'mahasiswa'
	// console.log(
	// 	db
	// 		.collection('mahasiswa')
	// 		.find()
	// 		.toArray((error, result) => {
	// 			console.log(result)
	// 		})
	// )

	// Menampilkan data berdasarkan kriteria yang ada pada collection 'mahasiswa'
	// console.log(
	// 	db
	// 		.collection('mahasiswa')
	// 		.find({ nama: 'ahmadi' })
	// 		.toArray((error, result) => {
	// 			console.log(result)
	// 		})
	// )

	//Mengubah satu data berdasarkan id
	// const promiseUpdate = db.collection('mahasiswa').updateOne(
	// 	{
	// 		nama: 'ahmadi berubah',
	// 	},
	// 	{
	// 		$set: { nama: 'ahmadi' },
	// 	}
	// )
	// promiseUpdate
	// 	.then((result) => {
	// 		console.log(result)
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 	})

	//Mengubah data lebih dari satu berdasarkan kriteria
	// db.collection('mahasiswa').updateMany(
	// 	{
	// 		nama: 'ahmadi',
	// 	},
	// 	{
	// 		$set: { email: 'ahmadi@payuni.co.id' },
	// 	}
	// )

	// //Menghapus satu data berdasarkan kriteria
	// db.collection('mahasiswa')
	// 	.deleteOne({
	// 		nama: 'ahmadi',
	// 	})
	// 	.then((result) => {
	// 		console.log(result)
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 	})

	//Menghapus satu data berdasarkan kriteria
	db.collection('mahasiswa')
		.deleteMany({
			nama: 'reno aja',
		})
		.then((result) => {
			console.log(result)
		})
		.catch((error) => {
			console.log(error)
		})
})
