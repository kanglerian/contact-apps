const yargs = require('yargs');
const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts');

yargs.command({
    command: 'add',
    describe: 'Menambahkan kontak baru',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        nohp: {
            describe: 'Nomor handphone',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function(argv){
        simpanContact(argv.nama, argv.email, argv.nohp);
    }
}).demandCommand();

// menampilkan semua daftar kontak nama & no hp

yargs.command({
    command: 'list',
    describe: 'Menampilkan semua daftar kontak',
    handler: function(argv){
        listContact();
    }
});

// menampilkan detail sebuah kontak

yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah kontak',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        detailContact(argv.nama);
    }
});

// menghapus sebuah kontak berdasarkan nama

yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        deleteContact(argv.nama);
    }
});

yargs.parse();