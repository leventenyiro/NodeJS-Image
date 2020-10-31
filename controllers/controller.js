const path = require("path")
const Database = require("../models/Database")

exports.getImage = (req, res) => {
    res.sendFile(path.resolve("./images/table.png"))
}

exports.addImage = (req, res) => {
    //console.log(req.file)
    if (req.file == undefined)
        res.send("Error")
    else {
        const db = new Database()
        db.addImage(req, (result) => {
            res.send(result)
            db.end()
        })
    }
}