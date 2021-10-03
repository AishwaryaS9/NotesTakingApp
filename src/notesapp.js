//importing libraries

// const {
//     magenta
// } = require('chalk');

const magenta = require('chalk');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const validator = require('validator');

//Declaring Constants
const fileName = 'notes.json';
const filePath = './dataFiles/notes.json';
const backupPath = './dataFiles/backup.txt';

const fileManipulation = (data) => {
    console.log(chalk.magenta('-> Insert data Start'))
    checkFile();
    let _filedata = readFile();

    //Create data

    _filedata[`Note - ${Object.keys(_filedata).length}`] = `${data}`
    _filedata = JSON.stringify(_filedata);
    writeData(_filedata);
    console.log(chalk.magenta('-> Insert data Complete'));

}

const fileData = (author, title, body) => {
    console.log(chalk.magenta('-> Creating data for file'));
    let data = {
        title: title,
        author: author,
        body: body
    }
    data = JSON.stringify(data);
    fileManipulation(data);
}




/**
 * Function to check whether file is present or not
 */

const checkFile = () => {
    if (fs.existsSync(filePath)) {
        console.log(chalk.magenta('-> File is present'));
    } else {
        console.log(chalk.magenta('-> File is not present'));
        createFile()
    }
}

/**
 * Function to create a new json file
 */
const createFile = () => {
    console.log(chalk.magenta('-> Create a new blank json file <-'));
    fs.writeFileSync(filePath, '{}');

}

/**
 * Function to write data file
 */
const writeFile = (notes) => {
    console.log(chalk.magenta('-> Writing data into file <-'));
    fs.appendFileSync(filePath, notes);
    fs.appendFileSync(filePath, ',\n')
}


/**
 * Function to read data file
 */
const readFile = () => {
    console.log(chalk.magenta('-> Reading data from file <-'));
    let fileData = fs.readFileSync(filePath, {
        encoding: "utf8"
    });
    fileData = JSON.parse(fileData);
    return fileData;

}

const writeData = (data) => {
    console.log(chalk.magenta('-> Writing data into file <-'));
    fs.writeFileSync(filePath, data)
}

const exportNotes = (path) => {
    console.log(chalk.magenta('-> Exporting notes data file <-'));
    let _exportData = JSON.stringify(readFile());
    fs.writeFileSync(path, _exportData)
}

//Main Functionality
const removeNote = (_title) => {
    let _filedata = readFile();
    let removeflag = true;
    for (let _data in _filedata) {
        let tempdata = JSON.parse(_filedata[_data]);
        if (tempdata.title == _title) {
            removeflag = false;

            //creating backup
            let _backup = {};
            _backup[`${_data}`] = _filedata[_data];
            backup(JSON.stringify(_backup));

            //Deleting data
            console.log(chalk.red(`Deleting title: ${_title} data from file`));
            let date = new Date();
            let deletedata = {
                title: 'remove',
                description: `removed on --->${date}`
            }

            _filedata[_data] = JSON.stringify(deletedata);
        }
    }

    if (removeflag) {
        console.log(chalk.green(`(-----------No Data found with title:${_title})----------)`));
        console.log(chalk.green(`(----------Please run list command to check note----------)`));
    } else {
        _filedata = JSON.stringify(_filedata);
        fs.writeFileSync(filePath, _filedata);
    }
}

const backup = (_backup) => {
    if (!fs.existsSync(backupPath)) {
        fs.writeFileSync(backupPath, '')
    }
    fs.appendFileSync(backupPath, _backup);
    fs.appendFileSync(backupPath, ',\n');
    console.log(chalk.green('->Crating backup for delete data'))
}

const notesList = () => {
    let _notes = readFile();
    for (let note in _notes) {
        let temp = JSON.parse(_notes[note]);
        if (temp.title != 'remove') {
            console.log(chalk.cyan(`    -- ${temp.title}`))
        }
    }
}

const readNote = (data) => {
    let _notes = readFile();
    for (let note in _notes) {
        let temp = JSON.parse(_notes[note]);
        if (temp.title == data) {
            console.log(chalk.cyan(`    - { Description } - `));
            console.log(chalk.yellow(`${temp.body}`))
        }
    }
}

module.exports = {
    filedata: fileData,
    removenote: removeNote,
    notelist: notesList,
    readNote: readNote
}