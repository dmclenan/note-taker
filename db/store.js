const fs = require("fs");
const uuidv1 = require("uuid/v1");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store {
    // read, write, get note, add note, remove note
    read() {
        return readFile("./db/db.json", "utf8");
    }
    write(note) {
        return writeFile("./db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then((notes) => {
            var noteData;
            try {
                noteData = [].concat(JSON.parse(notes))
            } catch (err) {
                noteData = []
            }
            return noteData
        })
    }
    postNotes(note) {
        const {
            text, title
        } = note
        if(!title || !text) {
            throw new Error("test")
        }
        const newNote = {
            title, text, id: uuidv1()
        }
        console.log(newNote)
        return this.getNotes()
            .then((noteData) => [...noteData, newNote])
            .then((allNotes) => this.write(allNotes))
            .then(() => newNote)
    }
    deleteNotes(id) {
        return this.getNotes()
            .then((noteData) => noteData.filter((note) => note.id !== id))
            .then((allNotes) => this.write(allNotes))
    }
}


module.exports = new Store();