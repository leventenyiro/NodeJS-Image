const parameter = require("../parameter.json")
const fs = require("fs")
const path = require("path")
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
        db.end()
    })
    //res.sendFile(path.resolve("./images/"))
}

exports.getImages = (req, res) => {
    const db = new Database()
    db.getImages((result) => {
        if (result == "Error")
            res.send("Error")
        else {
            result.forEach(e => {
                e.file = `/${parameter.fileupload.storage}/` + e.file
            })
            res.send(result)
            db.end()
        }
    })
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

exports.deleteImage = (req, res) => {
    const db = new Database()
    db.getImage(req, (result) => {
        if (result == "Error")
            res.send("Error")
        else {
            fs.unlinkSync(path.resolve(`./${parameter.fileupload.storage}/${result.file}`))
            db.deleteImage(req, (result) => {
                res.send(result)
                db.end()
            })
        }
    })
}