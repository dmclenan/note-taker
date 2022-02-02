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
            noteData = [].concat(JSON.parse(notes))
            return noteData
        })
    }
    postNotes
}

module.exports = new Store;