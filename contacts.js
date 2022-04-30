const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// membuat folder data jika belum ada
const dirPath = "./data";
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama, email, nohp) => {
    const contact = {nama, email, nohp};
    const contacts = loadContact();
    // cek duplikat
    const duplikat = contacts.find((contact) => contact.email === email);
    if(duplikat){
        console.log(
            chalk.bgRed.white.bold(
                'Contact sudah terdaftar gunakan email lain'
            ));
        return false;
    }

    // cek Email
    if(email){
        if(!validator.isEmail(email)){
            console.log(
                chalk.bgRed.white.bold(
                    'Email tidak valid!'
                ));
            return false;
        }
    }

    // cek no HP
    if(!validator.isMobilePhone(nohp, 'id-ID')){
        console.log(
            chalk.bgRed.white.bold(
                'Nomor HP tidak valid!'
            ));
        return false;
    }

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.bgGreen.black.bold(`Terima kasih, data ${nama} telah disimpan`));
}

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.bgBlue(`Daftar kontak`));
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.nohp}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    
    if(!contact){
        console.log(
            chalk.bgRed.white.bold(
                `${nama} tidak ditemukan`
            ));
        return false;
    }

    console.log(chalk.bgBlue(contact.nama));
    console.log(contact.nohp);
    if(contact.email){
        console.log(contact.email);
    }
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if(contacts.length === newContacts.length){
        console.log(
            chalk.bgRed.white.bold(
                `${nama} tidak ditemukan`
            ));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.bgGreen.black.bold(`Data kontak ${nama} berhasil dihapus`));

};

module.exports = {
    simpanContact,
    listContact,
    detailContact,
    deleteContact
};