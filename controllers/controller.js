const parameter = require("../parameter.json")
const fs = require("fs")
const path = require("path")
const Database = require("../models/Database")

exports.getImage = (req, res) => {
    const db = new Database()
    db.getImage(req, (result) => {
        if ("error" in result)
            res.send("Error")
        else if (result == undefined)
            res.end()
        else {
            result.file = `/${parameter.fileupload.storage}/` + result.file
            res.json(result)
        }
        db.end()
    })
    //res.sendFile(path.resolve("./images/"))
}

exports.getImages = (req, res) => {
    const db = new Database()
    db.getImages((result) => {
        result.forEach(e => {
            e.file = `/${parameter.fileupload.storage}/` + e.file
        })
        console.log(result)
        res.json(result)
        db.end()
    })
}

exports.addImage = (req, res) => {
    if (req.file == undefined)
        res.send("Error")
    else {
        const db = new Database()
        db.addImage(req, (result) => {
            if ("error" in result)
                fs.unlinkSync(path.resolve(`./${parameter.fileupload.storage}/${req.file.filename}`))
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
            db.deleteImage(req, (result) => {
                if (!"error" in result)
                    fs.unlinkSync(path.resolve(`./${parameter.fileupload.storage}/${result.file}`))
                res.send(result)
                db.end()
            })
        }
    })
}