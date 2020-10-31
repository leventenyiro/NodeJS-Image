const parameter = require("./parameter")
const Database = require("../models/Database")

exports.getImage = (req, res) => {
    const db = new Database()
    db.getImage(req, (result) => {
        if (result == "Error")
            res.send("Error")
        else {
            result.file = `/${parameter.fileupload.storage}/` + result.file
            res.send(result)
        }
    })
    //res.sendFile(path.resolve("./images/"))
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