const fs = require("fs");

/**
 * @typedef {'street'|'light/signs'|'hygiene'|'construction'|'cars'} SubjectOptions
 *
 * @typedef {Object} Entry
 * @property {String|undefined} id
 * @property {String|undefined} date //Date in ISO 8601 Extended Format
 * @property {SubjectOptions} subject
 * @property {String} street
 * @property {{lat: Number, lng: Number}|undefined} coord
 * @property {String} description
 */

const file = "./data/entries.json";

class Entries {
    constructor() {}

    /**
     * @returns {Entries[]}
     */
    getAllEntries() {
        return JSON.parse(fs.readFileSync(file));
    }

    /**
     * @param {Entry[]} parsedData
     */
    writeToFile(parsedData) {
        fs.writeFileSync(file, JSON.stringify(parsedData));
    }

    // /**
    //  * @param {Number} id
    //  * @param {Entry[]} parsedData
    //  * @returns {Number}
    //  */
    // getIndexById(id, parsedData) {
    //     const index = parsedData.findIndex((entry) => {
    //         return entry.id == id;
    //     });
    //     // Remember to check getIndexById != -1
    //     return index;
    // }

    /**
     * @returns {String}
     */
    getNewId() {
        return Math.random().toString(10).slice(2);
    }

    /**
     * @param {Entry} entry
     */
    newEntry(entry) {
        /**
         * Convert to array to preserve order
         * of proprties in the .json file
         */
        const entryArray = Object.entries(entry);
        entryArray.unshift(["date", new Date().toISOString()]);
        entryArray.unshift(["id", this.getNewId()]);
        const completeEntry = Object.fromEntries(entryArray);

        const parsedData = this.getAllEntries();
        parsedData.push(completeEntry);

        this.writeToFile(parsedData);
    }

    // /**
    //  * @param {Number} id
    //  * @param {User} newUser
    //  */
    // modifyUser(id, newUser) {
    //     const parsedData = this.getAllUsers();
    //     const index = this.getIndexById(id, parsedData);

    //     for (let property in parsedData[index]) {
    //         if (newUser[property] == undefined) continue;
    //         parsedData[index][property] = newUser[property];
    //     }

    //     this.writeToFile(parsedData);
    // }

    // /**
    //  * @param {Number} id
    //  */
    // deleteUser(id) {
    //     const parsedData = this.getAllUsers();
    //     const index = this.getIndexById(id, parsedData);

    //     parsedData.splice(index, 1);

    //     this.writeToFile(parsedData);
    // }
}

module.exports = Entries;
