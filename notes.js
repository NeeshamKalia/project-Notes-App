const fs = require('fs')
const chalk = require('chalk')
/* const getNotes =  () => {
    return 'Your notes...'
} */

const addNote =  (title, body)=>{
    const notes = loadNotes()
    /* const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    }) */
    //const duplicateNotes = notes.filter(note=> note.title === title)

    // debugger

    const duplicateNotes = notes.find((note) => note.title === title)
    if (!duplicateNotes) {  // or if duplicateNotes === undefined
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const saveNotes =  (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')  //console.log(chalk.red("aayush"))
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
const removeNote = (title) => {
    //console.log(title)
    const notes = loadNotes()
    const rest = notes.filter(note => note.title !== title)
    
    if(rest.length < notes.length){
        console.log(chalk.green.inverse("Note removed!"))
        saveNotes(rest)
    }
    else {
        console.log(chalk.red.inverse("No note found!"))
    }
}

const listNotes = () => {
    console.log((chalk.green.inverse("Your notes")))
    const notes = loadNotes()
    const titles = notes.forEach((note)=>{
        console.log(note.title)
    })
    
}
const readNote = (title) => {
    const notes = loadNotes()
    const noteRead = notes.find(x=> x.title === title)
    if(!noteRead){
        console.log(chalk.red.inverse("No note found"))
    }
    else {
        console.log((chalk.green(noteRead.title)) )
        console.log(noteRead.body)
    }
}

module.exports = {
    
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}