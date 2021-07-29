const fs = require('fs')

//membuat folder data
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath)
}

//membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json'
if (!fs.existsSync(dataPath)) {
	fs.writeFileSync(dataPath, '[]', 'utf-8')
}

//Mengambil semua data di contacts.json
const loadContact = () => {
	const file = fs.readFileSync('data/contacts.json', 'utf8')
	const contacts = JSON.parse(file)
	return contacts
}

// mengambil data di contacts.json berdasakan nama
const findContact = (nama) => {
	const contacts = loadContact()
	const contact = contacts.find(
		(contact) => contact.nama.toLowerCase() === nama.toLowerCase()
	)
	return contact
}

// Menimpa contacts.json dengan data contacts contacts baru
const saveContacts = (contacts) => {
	fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}

// Menambahkan data contact baru
const addContact = (contact) => {
	const contacts = loadContact()
	contacts.push(contact)
	saveContacts(contacts)
}

// Cek data duplikat
const cekDuplikat = (nama) => {
	const contacts = loadContact()
	return contacts.find((contact) => contact.nama === nama)
}

module.exports = { loadContact, findContact, addContact, cekDuplikat }
