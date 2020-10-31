class FileUpload {
    constructor() {
        const multer = require("multer")
        const path = require("path")
        const fs = require("fs")

        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, "images")
            },
            filename: (req, file, callback) => {
                if (fs.existsSync(path.resolve("./images/" + file.originalname)))
                    callback(null, Date.now() + "_" + file.originalname)
                else
                    callback(null, file.originalname)
            }
        })

        this.upload = multer({
            limits: {
                fileSize: 15000000
            },
            fileFilter: (req, file, callback) => {
                const filetypes = /jpeg|jpg|png|gif/
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
                const mimetype = filetypes.test(file.mimetype)

                if (!mimetype && !extname)
                    callback(null, false)
                else
                    callback(null, true)
            },
            storage: storage
        }).single("image")
    }
}

module.exports = FileUpload