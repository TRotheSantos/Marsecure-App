var express = require("express");
const Entries = require("../data/datalayer.js");
let Entry = new Entries();
var app = express();

module.exports = function apiServer(port) {
    //Parse incoming JSON requests
    app.use(express.json());

    //Allow cross app communication
    app.use((_req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/entries", (_req, res) => {
        const parsedData = Entry.getAllEntries();
        res.json(parsedData);
    });

    app.post("/api/newEntry", (req, _res) => {
        Entry.newEntry(req.body);
    });

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
};
