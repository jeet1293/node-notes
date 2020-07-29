const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);
    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green('Note added!'));
    } else {
        console.log(chalk.red('Note title exist!'));
    }
}

const getNotes = () => {
    console.log(chalk.blue.underline('My Notes'));
    loadNotes().forEach( (note) => {
        console.log(note.title); 
    });
}

const getNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if(note) {
        console.log('Body: ', note.body);
    } else {
        console.log(chalk.red('Note does not exist!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const updatedNotes = notes.filter(note => note.title !== title);
    
    if(notes.length == updatedNotes.length) {
        console.log(chalk.red('Note not found!'));
    } else {
        saveNotes(updatedNotes);
        console.log(chalk.green('Note remove!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes); 
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

module.exports = {
    addNote,
    getNotes,
    getNote,
    removeNote
}