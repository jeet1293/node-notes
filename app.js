const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

//Add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title : {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body : {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

//Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title : {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

//Read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title : {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notes.getNote(argv.title);
    }
});

//list command
yargs.command({
    command: 'list',
    describe: 'list of notes',
    handler() {
        notes.getNotes();
    }
});

yargs.parse();