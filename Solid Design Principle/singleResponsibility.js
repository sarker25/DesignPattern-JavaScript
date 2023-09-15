class Journal {
  constructor() {
    this.count = 0;
    this.entry = {};
  }
  addEntry(text) {
    this.count++;
    let entry = `${this.count} : ${text}`;
    this.entry[this.count] = entry;
  }
  removeEntry(index) {
    if (this.count > index < 0) {
      return `No Entries in ${index} index`;
    }
    delete this.entries[index];
  }
  toString() {
    return Object.values(this.entry).join("\n");
  }
}

const journal = new Journal();

class PersistentManager {
  preprocess(journal) {}
  saveToFile({ journal, fileUrl }) {
    fs.writeFileSync(fileUrl, journal.toString());
  }
}
