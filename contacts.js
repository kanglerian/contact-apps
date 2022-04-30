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

const simpanContact = (nama, email, nohp) => {
    const contact = {nama, email, nohp};
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);

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

module.exports = {
    simpanContact
};