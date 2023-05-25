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
        //Calculate entries to show
        const parsedData = Entry.getAllEntries();
        console.log(parsedData);
        // const entriesPerPage = Number(req.query.size);
        // const currentPage = Number(req.query.page);
        // const offset = (currentPage - 1) * entriesPerPage;

        // //Final page
        // const maxPage = Math.ceil(parsedData.length / entriesPerPage);

        // const response = {
        //     entries: parsedData.slice(offset, offset + entriesPerPage),
        //     maxPage: maxPage,
        // };

        res.json(parsedData);
    });

    app.post("/api/newEntry", (req, _res) => {
        Entry.newEntry(req.body);
    });

    // app.post("/api/modifyUser/:id", (req, _res) => {
    //     const id = req.params.id;
    //     Entry.modifyUser(id, req.body);
    // });

    // app.get("/api/user/:id", (req, res) => {
    //     const id = req.params.id;
    //     const parsedData = Entry.getAllUsers();
    //     const index = Entry.getIndexById(id, parsedData);
    //     res.json(parsedData[index]);
    // });

    // app.delete("/api/deleteUser/:id", (req, _res) => {
    //     const id = req.params.id;
    //     Entry.deleteUser(id);
    // });

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
};
