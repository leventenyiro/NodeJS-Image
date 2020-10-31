const path = require("path")

exports.getImage = (req, res) => {
    res.sendFile(path.resolve("./images/table.png"))
}

exports.addImage = (req, res) => {
    if (req.file == undefined)
        res.send("Error")
    else
        res.send("Successful")
}