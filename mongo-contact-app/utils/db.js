const mongoose = require('mongoose')

mongoose.connect(
	'mongodb+srv://sa:2016330040@cluster0.jaza7.mongodb.net/ahmadidb?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	}
)

// Menambahkan 1 data
// const contact1 = new Contact({
// 	nama: 'Ahmadi',
// 	email: 'ahmadi@gmail.com',
// 	nohp: '085635425667',
// })

// contact1.save().then((Contact) => {
// 	console.log(Contact)
// })
