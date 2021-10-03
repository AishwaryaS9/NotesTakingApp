// Importing libraries chalk, yargs
const chalk = require('chalk');
const yargs = require('yargs');

const notesapp = require('./src/notesapp');

//Customise yargs version
yargs.version("1.0.0");

//Creating add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Add Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Add Note Body',
            demandOption: true
        }
    },
    handler: (argv) => {
        console.log(chalk.magenta("---------- Adding a new note ----------"));
        // console.log(argv)
        let author = 'Aishwarya S'
        notesapp.filedata(author, argv.title, argv.body);
        console.log(chalk.magenta("--------- Adding Data Complete ----------"));

    }
})

//Creating remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Remove Note title',
            demandOption: true,
            type: 'string'
        }
    },

    handler: (argv) => {
        console.log(chalk.magenta('---------- Remove the note ----------'))
        // console.log(argv)
        notesapp.removenote(argv.title);
        console.log(chalk.magenta('------- Remove the note complete ----------'))

    }
})

//Creating List command
yargs.command({
    command: 'list',
    describe: 'list a note',
    handler: (argv) => {
        console.log(chalk.magenta('---------- List of notes ----------'))
        // console.log(argv)
        notesapp.notelist();
        console.log(chalk.magenta('------- List of note completed ----------'))

    }
})

//Creating Read Command
yargs.command({
    command: 'read',
    describe: 'Read a list',
    builder: {
        title: {
            describe: 'Add Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.magenta('---------- Reading a list ----------'))
        // console.log(argv)
        notesapp.readNote(argv.title);
        console.log(chalk.magenta('----------- Reading a list Ends ----------'))
    }

})


yargs.parse();