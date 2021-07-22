// Synchronus

// const getUserSync = (id) => {
// 	// let nama = '';
// 	// if ( id === 1) {
// 	//     nama = 'ahmadi';
// 	// } else {
// 	//     nama = 'agung';
// 	// }
// 	const nama = id === 1 ? 'ahmadi' : 'agung'
// 	return { id, nama }
// }

// const userSatu = getUserSync(1)
// console.log(userSatu)

// const userDua = getUserSync(2)
// console.log(userDua)

// const halo = 'Hello World'
// console.log(halo)

/* // Asyncronous

const getUser = (id, callback) => {
	const time = id === 1 ? 3000 : 2000
	setTimeout(() => {
		const nama = id === 1 ? 'ahmadi' : 'agung'
		callback({ id, nama })
	}, time)
}

const userSatu = getUser(1, (hasil) => {
	console.log(hasil)
})
const userDua = getUser(2, (hasil) => {
	console.log(hasil)
})
 */
// const halo = 'Hello World'
// console.log(halo)

function cetakNama(nama) {
	return `Halo, nama saya ${nama}`
}

const PI = 3.14

const mahasiswa = {
	nama: 'Dodi Ferdiansyah',
	umur: '20',
	cetakMhs() {
		return `Halo, nama saya ${this.nama} dan saya ${this.umur} tahun.`
	},
}

class Orang {
	constructor() {
		console.log('Objek orang telah dibuat')
	}
}

// module.exports.cetakNama = cetakNama
// module.exports.PI = PI
// module.exports.mahasiswa = mahasiswa
// module.exports.Orang = Orang

// module.exports = {
// 	cetakNama: cetakNama,
// 	PI: PI,
// 	mahasiswa: mahasiswa,
// 	Orang: Orang,
// }

module.exports = { cetakNama, PI, mahasiswa, Orang }
