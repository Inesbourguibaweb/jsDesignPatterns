const fs = require('fs');
const os = require('os');
const path = require('path');

console.log('first', os.homedir());
class Journal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }

  //   save(fileName) {
  //     fs.writeFileSync(fileName, this.toString());
  //   }
  load(fileName) {}
  loaFromUrl(url) {}
}

Journal.count = 0;
console.log('Journal', Journal);

class PersistenceManager {
  preprocess(j) {
    //
  }

  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}
let j = new Journal();
j.addEntry('hello 1');
j.addEntry('hello 2');
console.log(j.toString());

let p = new PersistenceManager();
let filename = 'journal.txt';
p.saveToFile(j, filename);
