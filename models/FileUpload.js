class FileUpload {
    constructor() {
        const multer = require("multer")
        const path = require("path")

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "images")
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname)
            }
        })

        this.upload = multer({
            limits: {
                fileSize: 15000000
            },
            fileFilter: (req, file, cb) => {
                const filetypes = /jpeg|jpg|png|gif/
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
                const mimetype = filetypes.test(file.mimetype)

                if (!mimetype && !extname)
                    cb(null, false)
                else
                    cb(null, true)
            },
            storage: storage
        }).single("image")
    }
}

module.exports = FileUpload